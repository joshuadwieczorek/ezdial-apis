const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/user");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/account");
const multer = require("multer");
const sharp = require("sharp");
const { USER_ROLES } = require("../constants");

// Route for creating a new user
router.post("/users", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists by email" });
    user = new User({...req.body, role:USER_ROLES.USER});
    const result = await user.save();
    // sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    console.log(result, token);
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wrong", e });
  }
});

// Route for loggin in
router.post("/users/login", async (req, res) => {
  console.log("body", req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong" });
  }
});

// Log out user
router.post("/users/logout", auth(), async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//Log out all tokens
router.post("/users/logoutAll", auth(), async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//Route for user profile
router.get("/users/me", auth(), async (req, res) => {
  console.log("Test");
  res.send(req.user);
});

router.get("/users/authenticate", async (req, res) => {
  const { authorization } = req.headers;

  const token = authorization ? authorization.split(" ")[1] : false;
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    const user = await User.findOne({ _id: decoded._id });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
  // jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
  //   if (err)
  //     return res
  //       .status(500)
  //       .send({ auth: false, message: "Failed to authenticate token." });

  // res.status(200).send(decoded);
  // });
});
// Updating profile

router.patch("/users/me", auth(), async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});
// Delete a user
router.delete("/users/me", auth(), async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// Route to upload avatar image

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

//  Route to upload avatar
router.post(
  "/users/me/avatar",
  auth(),
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Route to delete avatar
router.delete("/users/me/avatar", auth(), async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// Route to fetch an avatar
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;

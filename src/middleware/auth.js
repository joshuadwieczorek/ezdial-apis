const jwt = require("jsonwebtoken");
const { USER_ROLES } = require("../constants");
const User = require("../models/user");

const auth = (roles = [USER_ROLES.ADMIN, USER_ROLES.USER]) => async (req, res, next) => {
  try {

    const { authorization } = req.headers;
    const token = authorization ? authorization.split(" ")[1] : false;
    if (!token)
      throw new Error("Unauthorized User!");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error("User Not Found");
    }
    if (!roles.includes(user.role)) {
      throw new Error("Unauthorized User!");
    }
    req.token = token;
    req.user = user;
    // console.log("auth", user._id);
    next();

  } catch (error) {
    console.log(error.message);
    res.status(401).send({ message: error.message });
  }
};

module.exports = auth;

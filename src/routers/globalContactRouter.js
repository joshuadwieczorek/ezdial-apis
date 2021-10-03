const Contacts = require("../models/contact");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { USER_ROLES, CONTACT_TYPES } = require("../constants");

// Route for making new articles
router.post(
  "/contact",
  auth([USER_ROLES.ADMIN]),
  async (req, res) => {
    const exists = await Contacts.findOne({ symbolSet: req.body.symbolSet, type: CONTACT_TYPES.GLOBAL })
    if (exists)
      return res.status(409).json({ message: "Symbol Set must be unique!" });
    const contact = new Contacts({
      type: CONTACT_TYPES.GLOBAL,
      phone: req.body.phone,
      symbolSet: req.body.symbolSet,
      symbolSetObject: req.body.symbolSetObject,
      owner: req.user._id,
    });

    try {
      await contact.save();
      console.log(contact);
      res.status(201).send(contact);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });

router.get("/contact", auth(), async (req, res) => {
  try {
    console.log(req.user);
    const contacts = await Contacts.find({ owner: req.user._id, });
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "Something went wrong" });
  }
});

router.get("/contact/:symbolSet", async (req, res) => {
  try {
    const contacts = await Contacts.findOne({ symbolSet: req.params.symbolSet, type:CONTACT_TYPES.GLOBAL });
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "Something went wrong" });
  }
});

router.delete("/contact/:id",
  auth([USER_ROLES.ADMIN]), async (req, res) => {
    try {
      const result = await Contacts.deleteOne({
        _id: req.params.id,
        owner: req.user._id,
      });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error, message: "Something went wrong" });
    }
  });

module.exports = router;

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CONTACT_TYPES } = require("../constants");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  symbolSet: {
    type: String,
    // unique: true,
  },
  symbolSetObject: {
    number: { type: Number, required: true },
    alphabet: { type: String, required: true },
    emoji: { type: String, required: true }
  },
  phone: {
    type: String,
    // unique: true,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  type: {
    type: String,
    enum: [CONTACT_TYPES.GLOBAL, CONTACT_TYPES.LOCAL]
  }
});



module.exports = mongoose.model("contacts", contactSchema);

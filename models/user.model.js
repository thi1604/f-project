const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  tokenUser: String,
  avatar: String,
  status: {
    type: String,
    default: "active"
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const user = new mongoose.model("User", userSchema, "user");

module.exports = user;
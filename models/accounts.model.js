const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  token: String,
  avatar: String,
  role_id: String,
  roleName: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
});

const account = mongoose.model("Account", accountSchema, "accounts");

module.exports = account;

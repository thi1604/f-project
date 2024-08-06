const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  websiteName: String,
  phone: String,
  address: String,
  logo: String,
  email: String,
  copyright: String
}, {
  timestamps: true
});

const Setting = new mongoose.model("Setting", settingSchema, "settings");

module.exports = Setting;
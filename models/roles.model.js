const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
{
  title: String,
  description: String,
  permissions: {
    type: Array,
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  }
},
{
  timestamps : true //Tu dong update lai time khi creat va chinh sua
});

const role = mongoose.model("roleSchema", roleSchema, "roles");

module.exports = role;
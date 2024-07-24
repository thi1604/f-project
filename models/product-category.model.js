const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
  title: String,
  description: String,
  parent_id: {
    type: String,
    default: ""
  },
  thumbnail: String,
  status: String,
  position: Number,
  idPersonCreated: String,
  idPersonUpdated: String,
  idPersonDeleted: String,
  deleted: {
    type: Boolean,
    default: false
  },
  slug: { //Check va update tu dong khi trung title(neu trung se sinh ra 1 chuoi random duy nhat)
    type: String,
    slug: "title",
    unique: true
  }
},
  {
  timestamps : true //Tu dong update lai time khi creat va chinh sua
  }
);

const ProductCategory = mongoose.model("roductCategory", categorySchema, "products-catergory");

module.exports = ProductCategory;


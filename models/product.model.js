const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  parent_id: String,
  status: String,
  feauted: String, // San pham noi bat
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
},{
  timestamps : true //Tu dong update lai time khi creat va chinh sua
});

const product = mongoose.model("Product", productSchema, "products");

module.exports = product;

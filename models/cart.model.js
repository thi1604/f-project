const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
  products: [
    {
      idProduct: String,
      quantity: Number
    }
  ]
});

const cart = mongoose.model("Cart", cartSchema, "cart");

module.exports = cart;
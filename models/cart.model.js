const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
  products: [
    {
      idProduct: String,
      quantity: Number,
      choose: {
        type: String,
        default: false
      }
    }
  ],
  chooseAll: {
    type: Boolean,
    default: false
  }
});

const cart = mongoose.model("Cart", cartSchema, "cart");

module.exports = cart;
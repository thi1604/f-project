const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  userInfor : {
    fullName: String,
    address: String,
    phone: String,
    mail: String
  },
  products: [
    {
      productId: String,
      price: String,
      discountPercentage: Number,
      quantity: Number
    }
  ]
});

const checkout = mongoose.model("Checkout", checkoutSchema, "checkout");

module.exports = checkout;
const cartModel = require("../../models/cart.model");


module.exports = (req, res, next) => {
  const cartId = req.cookies.cartId;
  if(!cartId){
    const newCart = new cartModel();
    newCart.save();
    res.cookie("cartId", newCart.id);
  }
  next();
};
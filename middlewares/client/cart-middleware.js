const cartModel = require("../../models/cart.model");


module.exports = async (req, res, next) => {
  const cartId = req.cookies.cartId;
  res.locals.cartTotal = 0;
  if(!cartId){
    const newCart = new cartModel();
    await newCart.save();
    res.cookie("cartId", newCart.id);
  }
  else{
    const currentCart = await cartModel.findOne({
      _id: cartId
    });
    res.locals.cartTotal = currentCart.products.length;
  }
  next();
};
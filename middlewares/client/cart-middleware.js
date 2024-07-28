const cartModel = require("../../models/cart.model");


module.exports = async (req, res, next) => {
  const cartId = req.cookies.cartId;
  res.locals.cartTotal = 0;
  if(!cartId){
    console.log("bug");
    const newCart = new cartModel();
    await newCart.save();
    const time = 360 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", newCart.id, { expires: new Date(Date.now() + time)});
  }
  else{
    const currentCart = await cartModel.findOne({
      _id: cartId
    });
    res.locals.cartTotal = currentCart.products.length;
  }
  next();
};
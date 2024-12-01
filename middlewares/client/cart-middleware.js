const cartModel = require("../../models/cart.model");


module.exports = async (req, res, next) => {
  try {
    const cartNotLoginId = req.cookies.cartNotLoginId;
    // const cartNotLoginId = req.cookies.cartNotLoginId;

    res.locals.cartTotal = 0;
    if(!cartNotLoginId){ //User lan dau vao trang
      console.log("bug");
      const newCart = new cartModel();
      await newCart.save();
      const time = 3600 * 24 * 60 * 60 * 1000;
      res.cookie("cartNotLoginId", newCart.id, { expire: new Date(Date.now() + time)});  
    }
    else if(req.cookies.cartId){
      const currentCart = await cartModel.findOne({
        _id: req.cookies.cartId
      });
      if(currentCart)
        res.locals.cartTotal = currentCart.products.length;
    }
    else {
      const cart = await cartModel.findOne({
        _id: cartNotLoginId
      });
      res.locals.cartTotal = cart.products.length;
    }
    next();
  } catch (error) {
    res.send("403");
    return;
  }
};
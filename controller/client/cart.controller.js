const cartModel = require("../../models/cart.model");
const product = require("../../models/product.model");


module.exports.addPost = async (req, res) => {
  try{

    const productId = req.params.productId;

    const cartId = req.cookies.cartId;

    const productCurrent = await product.findOne({
      _id: productId
    }); //Bat loi try catch khi user gui sai id product
    
    if(!productCurrent){
      req.flash("error", "Lỗi!");
      res.redirect('/products');
      return;
    }

    const cartCurrent = await cartModel.findOne({
      _id: cartId
    });

    const existProductInCart = cartCurrent.products.find(item => { //Khi dung {} phai co return, neu khong co return thi chi la cac cau lenh
      return item.idProduct == productId
    }
      
    );

    if(existProductInCart){
      await cartModel.updateOne({
        _id: cartId,
        'products.idProduct': productId
      }, {
        $set: {
          'products.$.quantity': existProductInCart.quantity + parseInt(req.body.quantity)
        }
      });
    }
    else{
      await cartModel.updateOne({
        _id: cartId
      }, {
        $push: {
          'products': {
            idProduct: productId,
            quantity: parseInt(req.body.quantity)
          }
        }
      });
    }
    req.flash("success", "Đã thêm vào giỏ hàng!");
    
    if(req.cookies.pageCurrent && req.cookies.pageCurrent != 1)
      res.redirect(`/products?page=${req.cookies.pageCurrent}`);
    else
      res.redirect('/products');
  }
  catch(error){
    req.flash("error", "Lỗi!");
    res.redirect('/products');
  }
};

module.exports.detail = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cartCurrent = await cartModel.findOne({
    _id: cartId
  });

  cartCurrent.totalPrice = 0;

  for (const item of cartCurrent.products) {
    const productCurrent = await product.findOne({
      _id: item.idProduct
    }).select("thumbnail price title discountPercentage stock"); 

    productCurrent.priceNew = ((1 - (productCurrent.discountPercentage)/100) * productCurrent.price).toFixed(0);
    productCurrent.totalPriceProduct = productCurrent.priceNew * productCurrent.stock;
    item.infoProduct = productCurrent;
    cartCurrent.totalPrice += productCurrent.totalPriceProduct;
  }

    res.render("client/pages/cart/index.pug", {
    pageTitle: "Giỏ hàng",
    cartDetail: cartCurrent
  });
}
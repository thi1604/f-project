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
    // console.log("ok");
    const productCurrent = await product.findOne({
      _id: item.idProduct
    }).select("thumbnail price title discountPercentage stock slug id"); 
    
    // console.log(productCurrent);

    //Check so luong san pham trong gio hang co lon hon stock
    // if(item.quantity > productCurrent.stock){
    //   item.quantity = productCurrent.stock;

    // }
    //EndCheck so luong san pham trong gio hang co lon hon stock


    productCurrent.priceNew = parseInt(((1 - productCurrent.discountPercentage/100) * productCurrent.price).toFixed(0));
    productCurrent.totalPriceProduct = productCurrent.priceNew * item.quantity;

    // console.log(productCurrent.totalPriceProduct);
    item.infoProduct = productCurrent;
    if(item.choose == "true")
      cartCurrent.totalPrice += productCurrent.totalPriceProduct;
  }

  res.render("client/pages/cart/index.pug", {
    pageTitle: "Giỏ hàng",
    cartDetail: cartCurrent
  });
}

module.exports.detailPatch = async (req, res) => {
    const listProductId = req.body;
    const productsInCart = await cartModel.findOne({
      _id: req.cookies.cartId
    });
    //Neu user chon toan bo, cho hien thi checked tren nut checkall
    if(listProductId.length == productsInCart.products.length){
      await cartModel.updateOne({
        _id: req.cookies.cartId
      },{
        chooseAll: true
      });
    }
    else{
      await cartModel.updateOne({
        _id: req.cookies.cartId
      },{
        chooseAll: false
      });
    }

    for (const item of productsInCart.products) {
      await cartModel.updateOne({
        _id: req.cookies.cartId,
        'products.idProduct': item.idProduct
      }, {
        $set: {
          'products.$.choose': "false"
        }
      });
    }
    if(listProductId)
      for (const item of listProductId) {
        await cartModel.updateOne({
          _id: req.cookies.cartId,
          'products.idProduct': item
        }, {
          $set: {
            'products.$.choose': "true"
          }
        });
      }
    res.json({
      code: 200
    });
}

module.exports.delete = async (req, res) => {
  const idProduct = req.params.id;
  try{
    await cartModel.updateOne({
      _id: req.cookies.cartId,
    }, {
      $pull: {
        "products": {
          idProduct: idProduct
        } 
      }
    });
    req.flash("success", "Xóa thành công!");
    res.redirect("back");
  }
  catch(error){
    req.flash("error", "Lỗi!");
    res.redirect("/cart");
  }
}


module.exports.update = async (req, res) => {
  const idProduct = req.params.productId;
  try{
    await cartModel.updateOne({
      _id: req.cookies.cartId,
      'products.idProduct': idProduct
    }, {
      $set: {
        'products.$.quantity': parseInt(req.params.quantity)
      }
     
    });
    req.flash("success", "Cập nhật thành công!");
    res.redirect("/cart/detail");
  }
  catch(error){
    req.flash("error", "Lỗi!");
    res.redirect("/cart/detail");
  }
}



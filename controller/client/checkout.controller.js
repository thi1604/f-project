const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const checkoutModel = require("../../models/checkout.model");

module.exports.index = async (req, res) => {
  // Lay ra cac san pham user da chon
  const cartId = req.cookies.cartId;
  // console.log(cartId);
  const listProductsChoosed = [];

  const cartCurrent = await cartModel.findOne({
    _id: cartId,
  });

  let totalPrice = 0;

  for (const item of cartCurrent.products) {
    if(item.choose == "true"){
      const product = await productModel.findOne({
        _id: item.idProduct
      }).select("title price discountPercentage thumbnail");

      if(product){
        product.priceNew = parseInt(((1 - product.discountPercentage/100) * product.price).toFixed(0));
        product.totalPriceNew =  parseInt(product.priceNew * item.quantity);
        totalPrice += product.totalPriceNew;
        item.infoProduct = product;
      }
      listProductsChoosed.push(item);
    }
  }
  //End Lay ra cac san pham user da chon

  res.render("client/pages/checkout/index.pug", {
    pageTitle: "Trang đặt hàng",
    products: listProductsChoosed,
    TotalPrice: totalPrice
  });
};


module.exports.orderPost = async (req, res) => {
  const newCheckout = {};
  //Lay phan thong tin nguoi dat hang
  newCheckout.userInfor = req.body;
  //End Lay phan thong tin nguoi dat hang
  
  //Lay thong tin cac san pham trong don hang
  newCheckout.products = [];

  const cartCurrent = await cartModel.findOne({
    _id: req.cookies.cartId,
  });

  for (const item of cartCurrent.products) {
    if(item.choose == "true"){
      const product = await productModel.findOne({
        _id: item.idProduct
      }).select("price discountPercentage");
      if(product){
        //Cap nhat lai san pham trong gio hang
        await cartModel.updateOne({
          _id: req.cookies.cartId,
        }, {
          $pull: {
            'products': {
              idProduct: item.idProduct
            }
          }
        });
        //End Cap nhat lai san pham trong gio hang
      }
      //Tao object productInCheckout de luu vao database
      const productInCheckout = {
        productId: item.idProduct,
        price: product.price,
        discountPercentage: product.discountPercentage,
        quantity: item.quantity
      }
      newCheckout.products.push(productInCheckout);
    }
  }

  const record = new checkoutModel(newCheckout);
  await record.save();

  res.redirect(`/checkout/success/${record.id}`);
};


module.exports.success = async (req, res) => {
  const idOrder = req.params.idCheckout;

  
  const record = await checkoutModel.findOne({
    _id: idOrder
  });

  let totalPrice = 0;

  for (const item of record.products) {
    const product = await productModel.findOne({
      _id: item.productId
    }).select("title thumbnail");
    item.priceNew = parseInt(((1 - item.discountPercentage/100) * item.price).toFixed(0));
    item.totalPriceNew =  parseInt(item.priceNew * item.quantity);
    item.thumbnail = product.thumbnail;
    item.title = product.title
    totalPrice += item.totalPriceNew;
  }

  res.render("client/pages/order/success.pug", {
    pageTitle: "Trang đơn hàng",
    order: record,
    totalPrice: totalPrice
  });
};
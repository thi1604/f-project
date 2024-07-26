const productModel = require("../../models/product.model");


module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    let products = [];

    if(keyword){
      const regex = new RegExp(keyword, "i"); //Tim kiem tuong doi, coi lai regex

      products = await productModel.find({
        title: regex,
        deleted: false,
        status: "active"
      });
    }

    for (const item of products) {
      const newPrice = ((1 - item.discountPercentage/100)*item.price).toFixed(0);
      item.priceNew = newPrice;
    }

    res.render("client/pages/search/index.pug", {
      pageTitle: "Tìm kiếm sản phẩm",
      title: "Kết quả tìm kiếm : " + keyword,
      products: products,
      keyword: keyword
    });

};
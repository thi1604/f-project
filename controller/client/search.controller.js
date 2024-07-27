const productModel = require("../../models/product.model");
const Pagination = require("../../helper/pagination.helper");


module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    let products = [];
    let pagination = {};

    if(keyword){
      const regex = new RegExp(keyword, "i"); //Tim kiem tuong doi, coi lai regex
      const filter = {
        title: regex,
        status: "active",
        deleted: false
      }
      pagination = await Pagination(req, filter, "product", 6);
      
      products = await productModel
      .find(filter)
      .skip(pagination.skip)
      .limit(pagination.limitItems)
      .sort({
        possition: "desc"
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
      keyword: keyword,
      pagination: pagination
    });

};
const productModel = require("../../models/product.model");


module.exports.index = async (req, res)=>{

    // feautedProducts
    const feautedProducts = await productModel
    .find({
        feauted: "1",
        deleted : false,
        status : "active"
    })
    .sort({ possition :"desc"})
    .limit(6)
    .select("-description");

    for (const item of feautedProducts) {
        item.priceNew = ((1 - item.discountPercentage/100)* item.price).toFixed(0);
    }
    // EndfeautedProducts


    // listNewProducts
    const newProducts = await productModel
    .find({
        deleted : false,
        status : "active"
    })
    .sort({ position :"desc"})
    .limit(6)
    .select("-description"); //Lay tat ca cac truong tru truong description

    for (const item of newProducts) {
        item.priceNew = ((1 - item.discountPercentage/100)* item.price).toFixed(0);
    }
    // End listNewProducts

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chu",
        feautedProducts : feautedProducts,
        newProducts: newProducts
    });
};
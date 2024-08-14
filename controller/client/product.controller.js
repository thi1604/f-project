const Product = require("../../models/product.model.js");
const categoryModel = require("../../models/product-category.model");
const Pagination = require("../../helper/pagination.helper");


module.exports.index = async (req, res) => {
    const filter = {
        status: "active",
        deleted: false
    }

    //Pagination co async nen luu y phai dung await truoc
    const pagination = await Pagination(req, filter, "product", 6);

    if(req.query.page){
        res.cookie("pageCurrent", req.query.page);
    }
    else
        res.clearCookie("pageCurrent");

    const listProduct = await Product
    .find(filter).skip(pagination.skip).limit(pagination.limitItems).select("-description")
    .sort({position : "desc"});

    for (const item of listProduct) {
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }
    
    res.render("client/pages/product/index.pug", {
        pageTitle: "Tất cả sản phẩm",
        products: listProduct,
        pagination: pagination
    });
};


module.exports.category = async (req, res) => {
    const idCategoryCurrent = await categoryModel.findOne({
        slug: req.params.slug,
        status: "active",
        deleted: false
    }).select("id title");


    const allSubCategoryId = [];
    //De quy lay ra tat ca category con
    const getCategoryId = async (currentId) => {
        const listChild = await categoryModel.find({
            parent_id: currentId,
            status: "active",
            deleted: false
        });
        
        for (const item of listChild) {
            allSubCategoryId.push(item.id);
            await getCategoryId(item.id);
        }
    };

    await getCategoryId(idCategoryCurrent.id);

    //$in : Lay theo cac tieu chi co trong mang $in(chi can co trong mang $in)

    const filter = {
        parent_id:{
            $in: [
                idCategoryCurrent.id,
                ...allSubCategoryId
            ]
        },
        status: "active",
        deleted: false
    }

    const pagination = await Pagination(req, filter, "product", 6);

    const listProducts = await Product.find({
        parent_id:{
            $in: [
                idCategoryCurrent.id,
                ...allSubCategoryId
            ]
        },
        deleted: false,
        status: "active"
    }).skip(pagination.skip).limit(pagination.limitItems).select("-description");
        
    res.render("client/pages/product/index.pug", {
        pageTitle: idCategoryCurrent.title,
        products: listProducts,
        pagination: pagination
    });
}

module.exports.creat = (req, res) => {
    res.render("client/pages/product/creat.pug", {
        pageTitle: "Trang tao moi sp"
    });
};

module.exports.detail = async (req, res) => {

    const product = await Product.findOne({
        slug: req.params.slug
    });

    const newPrice = ((1 - product.discountPercentage/100) * product.price).toFixed(0);

    product.priceNew = newPrice;

    res.render("client/pages/product/detail.pug", {
        pageTitle: "Trang chi tiết sp",
        product: product
    });
};
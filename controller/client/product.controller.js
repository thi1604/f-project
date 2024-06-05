module.exports.index = (req, res)=>{
    res.render("client/pages/product/index.pug", {
        pageTitle: "Trang danh sach san pham"
    });
};

module.exports.creat = (req, res)=>{
    res.render("client/pages/product/creat.pug", {
        pageTitle: "Trang tao moi sp"
    });
};
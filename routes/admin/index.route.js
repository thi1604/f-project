const homeRouter = require("./home.route");
const productRouter = require("./product.route");

module.exports.index = (app) => {
    app.use("/admin", homeRouter);
    app.use("/admin/product", productRouter);
};
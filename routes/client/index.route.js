const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const middlewareCategory = require("../../middlewares/client/category-middleware");


module.exports.index = (app) => {
    app.use(middlewareCategory.category);
    app.use("/", homeRouter);
    app.use("/products", productRouter);
};
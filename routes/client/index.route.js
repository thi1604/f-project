const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const middlewareCategory = require("../../middlewares/client/category-middleware");
const searchRouter = require("./search.route");


module.exports.index = (app) => {
    app.use(middlewareCategory.category);
    app.use("/", homeRouter);
    app.use("/products", productRouter);
    app.use("/search", searchRouter);
};
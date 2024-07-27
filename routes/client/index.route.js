const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const middlewareCategory = require("../../middlewares/client/category-middleware");
const searchRouter = require("./search.route");
const cardRouter = require("./cart.route");
const middlewareCartId = require("../../middlewares/client/cart-middleware");

module.exports.index = (app) => {
    app.use(middlewareCategory.category);
    app.use(middlewareCartId);
    app.use("/", homeRouter);
    app.use("/products", productRouter);
    app.use("/search", searchRouter);
    app.use("/cart", cardRouter);
};
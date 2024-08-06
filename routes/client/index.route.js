const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const middlewareCategory = require("../../middlewares/client/category-middleware");
const searchRouter = require("./search.route");
const cardRouter = require("./cart.route");
const middlewareCartId = require("../../middlewares/client/cart-middleware");
const checkoutRouter = require("../../routes/client/checkout.route");
const userRouter = require("../../routes/client/user.route");
const middlewareUser = require("../../middlewares/client/user-middleware");
const middlewareSetting = require("../../middlewares/client/setting-middleware");


module.exports.index = (app) => {
    app.use(middlewareCategory.category);
    app.use(middlewareCartId);
    app.use(middlewareUser.infoUser);
    app.use(middlewareSetting);
    app.use("/", homeRouter);
    app.use("/products", productRouter);
    app.use("/search", searchRouter);
    app.use("/cart", cardRouter);
    app.use("/checkout", checkoutRouter);
    app.use("/user", userRouter);
};
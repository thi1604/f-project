const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./category.route.js");
const trashRouter = require("../admin/trash.route");
const prefixUrl = require("../../config/system.js");

module.exports.index = (app) => {
    const name = prefixUrl;  //Thu ham cho nay !!
    app.use(`/${name}`, homeRouter);
    app.use(`/${name}/product`, productRouter);
    app.use(`/${name}/product-category`, productCategoryRouter);
    app.use(`/${name}/trash`, trashRouter);
};
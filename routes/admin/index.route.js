const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./category.route.js");
const trashRouter = require("../admin/trash.route");
const rolesRouter = require("./roles.router");
const accountsRouter = require("./accounts.router");
const prefixUrl = require("../../config/system.js");
// Khai bao router cho cac trang lon
module.exports.index = (app) => {
    const name = prefixUrl;  //Thu ham cho nay !!
    app.use(`/${name}`, homeRouter);
    app.use(`/${name}/product`, productRouter);
    app.use(`/${name}/products-category`, productCategoryRouter);
    app.use(`/${name}/trash`, trashRouter);
    app.use(`/${name}/roles`, rolesRouter);
    app.use(`/${name}/accounts`, accountsRouter);
};
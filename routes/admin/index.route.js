const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const trashRouter = require("../admin/trash.route");
const prefixUrl = require("../../config/system.js");

module.exports.index = (app) => {
    const name = prefixUrl;  //Thu ham cho nay !!
    app.use(`/${name}`, homeRouter);
    app.use(`/${name}/product`, productRouter);
    app.use(`/${name}/trash`, trashRouter);
};
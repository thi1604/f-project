const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./category.route.js");
const trashRouter = require("../admin/trash.route");
const rolesRouter = require("./roles.router");
const accountsRouter = require("./accounts.router");
const authRouter = require("./auth.route");
const profileRouter = require("./profile.router");

const prefixUrl = require("../../config/system.js");
const authMiddleware = require("../../middlewares/admin/auth-middlewares");
// Khai bao router cho cac trang lon
module.exports.index = (app) => {
    const name = prefixUrl;  //Thu ham cho nay !!
    app.use(`/${name}/dashboard`, 
        authMiddleware,
        homeRouter
    );
    app.use(`/${name}/product`,
        authMiddleware,
        productRouter
    );
    app.use(`/${name}/products-category`,
        authMiddleware,
        productCategoryRouter
    );
    app.use(`/${name}/trash`, 
        authMiddleware,
        trashRouter
    );
    app.use(`/${name}/roles`,
        authMiddleware, 
        rolesRouter
    );
    app.use(`/${name}/accounts`,
        authMiddleware, 
        accountsRouter
    );
    app.use(`/${name}/profile`,
        authMiddleware, 
        profileRouter
    );
    
    app.use(`/${name}/auth`, authRouter);

};
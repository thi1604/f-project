const userModel = require("../../models/user.model");


module.exports.infoUser = async (req, res, next) => {
  const idTokenUser = req.cookies.tokenUser;
  if(idTokenUser){
    const user = await userModel.findOne({
      tokenUser : idTokenUser
    });
    if(user){
      res.locals.user = user;
      // res.cookie(
      //   "cartId", 
      //   user.cartId, 
      //   // { expire: new Date(Date.now() + time)}
      // );
    }
  }
  next();
}
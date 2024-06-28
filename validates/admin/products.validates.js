module.exports.alert = (req, res, next)=>{
  if(!req.body.title){
    req.flash('error', 'Chưa nhập thông tin bắt buộc!');
    res.redirect('back');
    return; //Ngan chay qua controller
  }
  next();
};
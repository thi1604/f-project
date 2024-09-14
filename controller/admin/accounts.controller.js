// const prefixUrl = require("../../config/system");
const Roles = require("../../models/roles.model");
const account = require("../../models/accounts.model");
const Token = require("../../helper/generate.helper");
const prefixUrl = require("../../config/system");
const md5 = require('md5');
const moment = require("moment");


module.exports.index = async (req, res) => {
  const records = await account.find({
    deleted: false
  });

  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Danh sách tài khoản admin",
    records: records
  });
}


module.exports.create = async (req, res) => {

  const roles = await Roles.find({
    deleted: false
  }).select("title");

  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Trang tạo mới tài khoản admin",
    roles: roles
  });
}


module.exports.createPost = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_create")){

    req.body.password = md5(req.body.password);
    const token = Token.generateRandomString(30);
    req.body.token = token;
    // Tim ten nhom quyen cho account
    const role = await Roles.findOne({
      _id: req.body.role_id,
      deleted : false
    }).select("title");

    req.body.roleName = role.title;

    req.body.idPersonCreated = res.locals.account.id;

    const newAccount = new account(req.body);
    await newAccount.save();
    req.flash("success", "Tạo thành công!");  
    res.redirect(`/${prefixUrl}/accounts`);
  }
  else{
    res.send("403");
  }
}

module.exports.edit = async (req, res) => {
  try{
    const id = req.params.id;
    const Account = await account.findOne({
      _id: id
    });
    if(Account){
      const roles = await Roles.find({
        deleted: false
      });
      res.render("admin/pages/accounts/edit.pug", {
        pageTitle : "Chỉnh sửa tài khoản",
        Account: Account,
        roles: roles
      })
    }
    else{
      req.flash("error", "Lỗi!");
      res.redirect(`/${prefixUrl}/accounts`);
    }
  }catch(error){
    req.flash("error", "Lỗi!");
    res.redirect(`/${prefixUrl}/accounts`);
  }
}  

module.exports.editPatch = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_edit")){
    try{
      const id = req.params.id;
      req.body.password = md5(req.body.password);
      req.body.idPersonUpdated = res.locals.account.id;
      await account.updateOne({
        _id: id
      }, req.body);
      req.flash("success", "Cập nhật thành công!");
      res.redirect('back');

    }catch(error){
      req.flash("error", "Lỗi!");
      res.redirect(`/${prefixUrl}/accounts`);
    }
  }
  else{
    res.send("403");
  }
}

module.exports.detail = async (req, res)=>{
  try {
    const id = req.params.id;
    const item = await account.findOne({
      _id : id
    });

    item.formatCreatedAt = moment(item.createdAt).format("HH:mm:ss DD/MM/YY");
    item.formatUpdatedAt = moment(item.updatedAt).format("HH:mm:ss DD/MM/YY");


    //Lay ra nguoi tao
    const accountCreated = await account.findOne({
      _id: item.idPersonCreated
    }).select("fullName");
    //Het lay ra nguoi tao

    //Lay ra nguoi updated
    const accountUpdated = await account.findOne({
      _id: item.idPersonUpdated
    }).select("fullName");
    //End lay ra nguoi updated

    if(accountUpdated){
      item.namePersonUpdated = accountUpdated.fullName;
    }
    if(accountCreated){
      item.namePersonCreated = accountCreated.fullName;
    }
    res.render(`${prefixUrl}/pages/accounts/detail.pug`,{
      pageTitle: "Chi tiết tài khoản",
      product : item
    });
  } catch (error) {
    res.redirect(`${prefixUrl}`);
  }
}

//ChangeStatus

module.exports.changeStatus = async (req, res) => {
  const {id, status} = req.params;
  try{
    const admin = await account.findOne({
      _id: id
    });

    if(admin && (status == "active" || status == "inactive")){
      await account.updateOne({
        _id : id
      }, {
        status: status
      });
      req.flash("success", "Cập nhật thành công!");
    }
    else{
      req.flash("error", "Lỗi!");
    }

  }
  catch(error){
    req.flash("error", "Lỗi!");
  }

  res.json({
    code: 200
  });
}

//End ChangeStatus

// delete
module.exports.deletePatch = async (req, res)=>{
  try {
    const id = req.body.idAccount;
    const item = account.findOne({
      _id: id
    });
    if(!item){
      req.flash("error", "Lỗi!");
    }
    else{
      await account.updateOne({
        _id: id
      }, {
        deleted: true
      });
      req.flash("success", "Xóa thành công!");
      res.json({
        code: 200
      });
    }
  } catch (error) {
    req.flash("error", "Lỗi!");
  } 
}

//End delete

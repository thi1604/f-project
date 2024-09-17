const roles = require("../../models/roles.model");
const prefix = require("../../config/system");
const pagination = require("../../helper/pagination.helper");
const moment = require("moment");
const account = require("../../models/accounts.model");

module.exports.index = async (req, res)=>{
  const filter = {
    deleted: false
  }

  const Pagination = await pagination(req, filter, "roles");

  const records = await roles.find(
    {deleted: false}
  )
  .skip(Pagination.skip)
  .limit(Pagination.limitItems);

  res.render(`${prefix}/pages/roles/index.pug`, {
    pageTitle: "Trang nhóm quyền",
    records: records,
    pagination: Pagination
  });
};

module.exports.create = (req, res)=>{
  res.render(`${prefix}/pages/roles/create.pug`, {
    pageTitle: "Trang nhóm quyền",
  });
};

module.exports.createPost = async (req, res)=>{
  if(res.locals.role.permissions.includes("roles_create")){
    req.flash("success", "Tạo mới thành công!");
    req.body.idPersonCreated = res.locals.account.id;
    const newRecord = new roles(req.body);
    await newRecord.save();
    res.redirect(`/${prefix}/roles`);
  }
  else{
    res.send("403");
  }

};

module.exports.edit = async (req, res)=>{
  const id = req.params.id;
  try{
    const record = await roles.findOne({
      _id: id
    });
    if(record){
      res.render(`${prefix}/pages/roles/edit.pug`, {
        pageTitle: "Chỉnh sửa nhóm quyền",
        record: record
      });
    }
    else{
      req.flash("error", "Lỗi!");
      res.redirect(`/${prefix}/roles`);
    }
  }
  catch(error){
    req.flash("error", "Lỗi!");
    res.redirect(`/${prefix}/roles`);
  }
};

module.exports.editPatch = async (req, res)=>{
  try {
    
    if(res.locals.role.permissions.includes("roles_edit")){
      const id = req.params.id;
      req.body.idPersonUpdated = res.locals.account.id;
      await roles.updateOne({
        _id: id
      }, req.body);
      req.flash("success", "Đã cập nhật!");
      res.redirect('back');
    }
  
    else{
      res.send("403");
    }
  } catch (error) {
    res.send("403");
  }

};

module.exports.permissions = async (req, res) =>{
  const records = await roles.find({
    deleted: false
  });

  res.render("admin/pages/roles/permissions.pug", {
    pageTitle: "Trang phân quyền",
    records: records
  });
};

module.exports.permissionsPatch = async (req, res) =>{
  try {
    
    if(res.locals.role.permissions.includes("roles_permissions")){
      const roleAndPermissions = req.body.rolesArray;
  
      roleAndPermissions.forEach(async (item)=> {
        await roles.updateOne({
          _id: item.id,
        }, {
          permissions: item.permissions
        });
      });
  
      res.json({
        code: 200
      });
  
    }
    else{
      res.send("403");
    }
  } catch (error) {
      res.send("403");
  }
};

module.exports.detail = async (req, res)=>{
  try {
    
    const id = req.params.id;
    const item = await roles.findOne({
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
  
    res.render(`${prefix}/pages/roles/detail.pug`,{
      pageTitle: "Chi tiết nhóm quyền",
      product : item
    });
  } catch (error) {
    res.send("403");
  }
}

module.exports.deletePatch = async (req, res)=>{
  if(res.locals.role.permissions.includes("roles_delete")){
    try {
      const id = req.body.idRole;
      const item = roles.findOne({
        _id: id
      });
      if(!item){
        req.flash("error", "Lỗi!");
      }
      else{
        await roles.updateOne({
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
  else{
    res.send("403");
  }
}

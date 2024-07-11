const roles = require("../../models/roles.model");
const prefix = require("../../config/system");


module.exports.index = async (req, res)=>{
  const records  = await roles.find({
    deleted: false
  });

  res.render(`${prefix}/pages/roles/index.pug`, {
    pageTitle: "Trang nhóm quyền",
    records: records
  });
};

module.exports.create = (req, res)=>{
  res.render(`${prefix}/pages/roles/create.pug`, {
    pageTitle: "Trang nhóm quyền",
  });
};

module.exports.createPost = async (req, res)=>{
  req.flash("success", "Tạo mới thành công!");
  const newRecord = new roles(req.body);
  await newRecord.save();
  res.redirect(`/${prefix}/roles`);
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
  const id = req.params.id;
  await roles.updateOne({
    _id: id
  }, req.body);
  req.flash("success", "Đã cập nhật!");
  res.redirect('back');
};
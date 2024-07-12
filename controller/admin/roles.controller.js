const roles = require("../../models/roles.model");
const prefix = require("../../config/system");
const pagination = require("../../helper/pagination.helper");

module.exports.index = async (req, res)=>{
  let records  = await roles.find({
    deleted: false
  });

  const Pagination = await pagination(req, records, "roles");

  records = await roles.find(
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
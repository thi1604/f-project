const roles = require("../../models/roles.model");


module.exports.index = async (req, res)=>{
  const records  = await roles.find({
    deleted: false
  });

  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Trang nhóm quyền",
    records: records
  });
};

module.exports.create = (req, res)=>{
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Trang nhóm quyền",
  });
};

module.exports.createPost = async (req, res)=>{
  const newRecord = new roles(req.body);
  await newRecord.save();
  res.redirect("/admin/roles");
};
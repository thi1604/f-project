const roles = require("../../models/roles.model");


module.exports.index = (req, res)=>{
  const records  = roles.find({
    deleted: false
  });

  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Trang nhóm quyền",
    records: records
  });
};
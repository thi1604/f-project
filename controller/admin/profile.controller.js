

module.exports.index = async (req, res) => {
  res.render("admin/pages/profile/index.pug", {
    pageTitle: "Thông tin cá nhân"
  });
};
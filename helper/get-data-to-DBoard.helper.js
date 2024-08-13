
module.exports.countData = async (nameModel) => {
  const record = {};
  record.total = await nameModel.countDocuments({
    deleted: false
  });
  record.active = await nameModel.countDocuments({
    status: "active",
    deleted: false
  });
  record.inactive = await nameModel.countDocuments({
    status: "inactive",
    deleted: false
  });
  return record;
}
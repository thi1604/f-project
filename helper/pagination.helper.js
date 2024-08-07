
module.exports =  async (req, filter, nameModel, limitItems = 4) => {
  if(nameModel == "trash")
    nameModel = "product";
  const product = require(`../models/${nameModel}.model`);
  //Tao object cho trang thai pagination
  const pagination = {
    limitItems : limitItems,
    currentPage : 1 //Mac dinh la trang 1
  };

  //Tim trang hien tai
  const page = req.query.page;
  if(page){
    pagination.currentPage = parseInt(page); //Can chuyen ve number, vi req.query.page tra ve string
  }
  //Bo qua cac san pham theo so trang theo cong thuc
  pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

  //Tinh tong so san pham render ra giao dien
  const totalPage = await product.countDocuments(filter);
  if(totalPage == 0) pagination.currentPage = 0;
  //Tinh so trang can dung
  pagination.totalPage = Math.ceil(totalPage / pagination.limitItems);
  
  return pagination;
};
const product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const filter = {
    deleted : false // Lay data tu modul theo object filter
  };
  if(req.query.status){
    filter.status = req.query.status;
  }
  // Tìm kiếm
  let keyword = "";
  if(req.query.keyword) {
    //Lay san pham theo keyword tuong doi
    const regex = new RegExp(req.query.keyword, "i");
    filter.title = regex;
    keyword = req.query.keyword;
  }
  // Hết Tìm kiếm

  // Object chua tat ca cac nut trang thai
  const listFilter = [
    {
      label : "Tất cả",
      status : ""
    },
    {
      label : "Hoạt động",
      status : "active"
    },
    {
      label : "Dừng hoạt động",
      status : "inactive"
    }
];

  //Tao object cho trang thai pagination
  const pagination = {
    limitItems : 4,
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
  //Lay san pham ra theo trang
  const Product = await product.find(filter).limit(pagination.limitItems).skip(pagination.skip);
  
  // Choc vao database lay data theo thang filter
  // const Product = await product.find(filter);
  res.render("admin/pages/products/index.pug", {
    pageTitle : "Trang sản phẩm ",
    listProducts: Product,
    keyword: keyword,
    listFilter : listFilter,
    pagination : pagination // Truyen object pagination cho de truy cap ben file pug
  });
}

module.exports.changeStatus = async (req, res) => {
  const {id, status} = req.params;

  await product.updateOne(
    {
      _id : id
    }, 
    {
      status : status
    }
  );

  res.redirect('back');
};


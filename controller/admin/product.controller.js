const product = require("../../models/product.model");
const Pagination = require("../../helper/pagination.helper");

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
  const listActions = [
    {
      label : "Hoạt động",
      status : "active"
    },
    {
      label : "Dừng hoạt động",
      status : "inactive"
    }
  ];
  //Lay ham phan trang tu folder helper
  const pagination = await Pagination(req, filter);
  //Lay san pham ra theo trang
  const Product = await 
  product.find(filter)
  .limit(pagination.limitItems)
  .skip(pagination.skip)
  .sort({position : 'desc'});
  
  // Choc vao database lay data theo thang filter
  // const Product = await product.find(filter);
  res.render("admin/pages/products/index.pug", {
    pageTitle : "Trang sản phẩm ",
    listProducts: Product,
    keyword: keyword,
    listFilter : listFilter,
    listActions : listActions,
    pagination : pagination // Truyen object pagination cho de truy cap ben file pug
  });
}

module.exports.changeStatus = async (req, res) => {
  //req.params lay cac gia tri dong trong cai link, tra ve ob
  const {id, status} = req.params;

  await product.updateOne(
    {
      _id : id
    }, 
    {
      status : status
    }
  );
  //Tra data ve cho FE, code duoi tra ve 1 ob 
  res.json({
    code : 200
  });
};

module.exports.changeManyStatus = async (req, res) => {
  
  const {ids, status} = req.body;

  if(status == "delete"){
    await product.updateMany(
      {
        _id : ids
      },
      {
        deleted: true
      }
    )
  }
  else{
    await product.updateMany(
      {
        _id : ids
      },
      {
        status: status
      }
    )
  }

  res.json({
    code : 200
  });
};

module.exports.deleteItem = async (req, res) => {
  
  const id = req.params.id;   //res.params tra ve 1 ob chua cac bien dong tren url
  await product.updateOne(
    {
      _id : id
    }, 
    {
      deleted : true
    }
  );
  res.json({
    code : 200
  });
};

module.exports.changePosition = async (req, res) => {
  const newPos = parseInt(req.body.newPos);
  const id = req.params.id;
  
  await product.updateOne({
    _id: id
  },
  {
    position: newPos
  }
  )
  
  res.json({
    code : 200
  });
};


const product = require("../../models/product.model");
const pagination = require("../../helper/pagination.helper");


module.exports.index = async (req, res)=>{
  const filter = {
    deleted : true
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
      label : "Khôi phục",
      status : "restore"
    },
    {
      label : "Xóa vĩnh viễn",
      status : "permanently-deleted"
    }
  ]
  const Pagination = await pagination(req, filter);
  const listProducts = await product.find(filter).limit(Pagination.limitItems).skip(Pagination.skip);

  res.render("admin/pages/trash/index.pug", {
    pageTitle : "Trang thùng rác",
    listProducts: listProducts,
    pagination : Pagination,
    listFilter : listFilter,
    listActions : listActions,
    keyword: keyword
  });

}


module.exports.restore = async(req, res) => {
  const id = req.params.id;
  await product.updateOne({
    _id : id
  }, 
  {
    deleted : false
  });
  req.flash('success', 'Khôi phục thành công!');
  res.json({
    code : 200
  })
}

module.exports.permanentlyDeleted = async(req, res) => {
  const id = req.params.id;
  
  await product.deleteOne({
    _id : id
  });
  req.flash('success', 'Xóa thành công!');
  res.json({
    code : 200
  })
}

module.exports.changeManyItem= async(req, res) => {
  const {ids, status} = req.body;

  if(status == "restore"){
    await product.updateMany({
      _id : ids
    }, 
    {
      deleted: false
    });
  }
  else{
    await product.deleteMany({
      _id: ids
    });
  }
  req.flash('success', 'Khôi phục thành công!');
  res.json({
    code : 200
  })
}

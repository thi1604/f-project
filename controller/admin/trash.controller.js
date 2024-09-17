const product = require("../../models/product.model");
const role = require("../../models/roles.model");
const pagination = require("../../helper/pagination.helper");
const account = require("../../models/accounts.model");
const moment = require("moment");

// product
module.exports.indexProduct = async (req, res)=>{
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
  
    const Pagination = await pagination(req, filter, "product");
    const listProducts = await product.find(filter).limit(Pagination.limitItems).skip(Pagination.skip);
    for(item of listProducts){
      const namePersonDeleted = await account.findOne({
        _id: item.idPersonDeleted
      }).select("fullName");
      if(namePersonDeleted){
        item.namePersonDeleted = namePersonDeleted.fullName;
      }
      item.formatUpdatedAt = moment(item.updatedAt).format("DD/MM/YY HH:mm:ss");
    }
  
    res.render("admin/pages/trash/products/index.pug", {
      pageTitle : "Trang thùng rác",
      listProducts: listProducts,
      pagination : Pagination,
      listFilter : listFilter,
      listActions : listActions,
      keyword: keyword
    });
}

module.exports.restoreProduct = async(req, res) => {
  try {
    if(res.locals.role.permissions.includes("roles_permissions")){
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
    else
      res.send("403");
  } catch (error) {
    res.send("403");
  }
}

module.exports.permanentlyDeletedProduct = async(req, res) => {
  try {
    if(res.locals.role.permissions.includes("roles_permissions")){
      const id = req.params.id;
    
      await product.deleteOne({
        _id : id
      });
      req.flash('success', 'Xóa thành công!');
      res.json({
        code : 200
      })
    }
  
    else
      res.send("403");
  } catch (error) {
    res.send("403");
  }
}

module.exports.changeManyItemProduct = async(req, res) => {
  try {
    
    if(res.locals.role.permissions.includes("roles_permissions")){
      const {ids, status} = req.body;
  
      if(status == "restore"){
        req.flash('success', 'Khôi phục thành công!');
        await product.updateMany({
          _id : ids
        }, 
        {
          deleted: false
        });
      }
      else{
        req.flash('success', 'Xóa thành công!');
        await product.deleteMany({
          _id: ids
        });
      }
      res.json({
        code : 200
      })
    }
    else
      res.send("403");
  } catch (error) {
    res.send("403");
  }
}

//End product


// Role
module.exports.indexRole = async (req, res)=>{
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
  
    const Pagination = await pagination(req, filter, "roles");
    const listProducts = await role.find(filter).limit(Pagination.limitItems).skip(Pagination.skip);
    for(item of listProducts){
      const namePersonDeleted = await account.findOne({
        _id: item.idPersonDeleted
      }).select("fullName");
      if(namePersonDeleted){
        item.namePersonDeleted = namePersonDeleted.fullName;
      }
      item.formatUpdatedAt = moment(item.updatedAt).format("DD/MM/YY HH:mm:ss");
    }
  
    res.render("admin/pages/trash/role/index.pug", {
      pageTitle : "Trang thùng rác",
      listProducts: listProducts,
      pagination : Pagination,
      listFilter : listFilter,
      listActions : listActions,
      keyword: keyword
    });
}

module.exports.restorePatch = async (req, res)=>{
  if(res.locals.role.permissions.includes("trash_edit")){
    try {
      const id = req.body.idRole;
      const item = role.findOne({
        _id: id
      });
      if(!item){
        req.flash("error", "Lỗi!");
      }
      else{
          const id = req.params.id;
          await role.updateOne({
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
    } catch (error) {
      req.flash("error", "Lỗi!");
    }
  }
  else{
    res.send("403");
  }
}
//End Role


// Account
module.exports.indexAccount = async (req, res)=>{
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

  const Pagination = await pagination(req, filter, "accounts");
  const listProducts = await account.find(filter).limit(Pagination.limitItems).skip(Pagination.skip);
  for(item of listProducts){
    const namePersonDeleted = await account.findOne({
      _id: item.idPersonUpdated
    }).select("fullName");
    if(namePersonDeleted){
      item.namePersonDeleted = namePersonDeleted.fullName;
    }
    item.formatUpdatedAt = moment(item.updatedAt).format("DD/MM/YY HH:mm:ss");
  }

  res.render("admin/pages/trash/accounts/index.pug", {
    pageTitle : "Trang thùng rác",
    listProducts: listProducts,
    pagination : Pagination,
    listFilter : listFilter,
    listActions : listActions,
    keyword: keyword
  });
}


module.exports.restoreAccPatch = async (req, res)=>{
  if(res.locals.role.permissions.includes("trash_edit")){
    try {
      const id = req.params.id;
      await account.updateOne({
        _id : id
      }, 
      {
        deleted : false
      });
      req.flash('success', 'Khôi phục thành công!');
      res.json({
        code : 200
      })
    } catch (error) {
      req.flash("error", "Lỗi!");
    }
  }
  else{
    res.send("403");
  }
}
//End Account


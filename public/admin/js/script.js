
// filter producst

const listProducts = document.querySelectorAll("[button-status]");
let url = new URL(window.location.href);

listProducts.forEach((item)=>{
  item.addEventListener("click", ()=>{
    const status = item.getAttribute("button-status");
    url.searchParams.delete("page"); //Neu loc trang thai san pham, mac dinh show tu trang 1 
    if(status != ""){
      url.searchParams.set("status", status);
    }
    else{
      url.searchParams.delete("status");
    }
    window.location.href = url;
  });
});

const currentStatus = url.searchParams.get("status") || ""; 
// Khi lay thuoc tinh tu dinh nghia, ta phai co dau []
const currentButton = document.querySelector(`[button-status = "${currentStatus}"]`);
if(currentButton)
  currentButton.classList.add("active");

// end filter producst


//Search products

const search = document.querySelector("[form-search]");
if(search){
  let url = new URL(window.location.href);
  search.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngan cho form load lai trang(Mac dinh cua form khi submit la load lai trang)
    url.searchParams.delete("page"); //Neu loc trang thai san pham, mac dinh show tu trang 1 
    const keyword = event.target.elements.keyword.value; // Lay ra gia tri trong o input
    // console.log(keyword);
    if(keyword)
      url.searchParams.set("keyword", keyword);
    else
      url.searchParams.delete("keyword");
    window.location.href = url.href;
  });
}

//End Search products

//Pagination

const listPagination = document.querySelectorAll("[num-page]"); 
// console.log(listPagination);

if(listPagination.length > 0){
  //Check xem gia tri page ma lon hon tong so nut phan trang, neu co
  // phai xoa gia tri page tren link va reload page
  let url = new URL(window.location.href);
  let numPageOnUrl = parseInt(url.searchParams.get("page"));
  let maxPage = listPagination[listPagination.length - 1];
  maxPage = parseInt(maxPage.getAttribute("num-page"));
  
  if(numPageOnUrl > maxPage){
    url.searchParams.delete("page");
    window.location.href = url.href;
  }
  //Bat su kien cho cac nut
  listPagination.forEach( (item) => {
    item.addEventListener("click", () => {
      const pageNumCurrent = item.getAttribute("num-page");
      if(pageNumCurrent && pageNumCurrent != "1"){
        url.searchParams.set("page", pageNumCurrent);
      }
      else
        url.searchParams.delete("page");
      window.location.href = url.href;
    });
  });
  let currPage = url.searchParams.get("page") || "";
  if(currPage == "") currPage = "1";
  const currButton = document.querySelector(`[num-page="${currPage}"]`);
  currButton.classList.add("active");
}

//End pagination


// Change Status Item

const listButton = document.querySelectorAll("[button-change-status]");

if(listButton.length > 0){
  listButton.forEach((item) => {
    item.addEventListener("click", () => {
      const link = item.getAttribute("link");
      //Call api voi phuong thuc la patch
      fetch(link, {
        method : "PATCH",
        headers: {
          "Content-Type": "application/json",
        }
      })
        // Tra ve cho FE data dang json, roi dich json thanh js
        .then(res => res.json())
        //Dich xong tra gia tri cho data, neu thanh cong reload lai trang
        .then(data => {
          if(data.code == 200){
            window.location.reload();
          }
        });
    });
  });
}


//Choose checkbox for change status all item

const changeAll = document.querySelector(`input[change-status-all]`);
const listItem = document.querySelectorAll(`input[change-status-item]`);
if(changeAll){
  changeAll.addEventListener("click", ()=>{
    const check = changeAll.checked;
    listItem.forEach((item)=>{
      item.checked = check;
    });
  });
}

//End Choose checkbox for change status all item

//Check all item. If true, changeAll has checked = true
const lengthAll = listItem.length;

listItem.forEach(item => {
  item.addEventListener("click", ()=> {
    const checkedListItem = document.querySelectorAll(`input[change-status-item]:checked`);
    if(lengthAll == checkedListItem.length){
      changeAll.checked = true;
    }
    else
      changeAll.checked = false;
  });
});

//Change many Item from checkbox
const divActive = document.querySelector("div[change-many-items]");
if(divActive){
  const select = divActive.querySelector("select");
  const button = divActive.querySelector("button");
  // const checkedListItem = document.querySelectorAll(`input[change-status-item]:checked`);
  button.addEventListener("click", () => {
    const checkedListItem = document.querySelectorAll(`input[change-status-item]:checked`);
    const ids = [];
    if(select.value != "" && checkedListItem.length > 0){
      checkedListItem.forEach((item) => {
        ids.push(item.getAttribute("value"));
      });

      const dataChange = {
        ids : ids,
        status : select.value
      }
      console.log(dataChange);
      const link = divActive.getAttribute("link");
      fetch(link, {
        method : "PATCH",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(dataChange)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200)
            window.location.reload();
        })
    } 
    else
      alert("Chưa chọn sản phẩm và hành động!");
  });
}

// Delete item
const listButtonDelete = document.querySelectorAll("[link-id-button]");
if(listButtonDelete.length > 0){
  listButtonDelete.forEach((item) => {
    item.addEventListener("click", ()=> {
      const link = item.getAttribute("link-id-button");
      fetch(link, {
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200)
            window.location.reload();
      })
    });
  });
}
// End Delete item

// Change Position
const listPosition = document.querySelectorAll("[change-position]");
if(listPosition.length > 0){
    listPosition.forEach((item)=>{
      item.addEventListener("change", ()=>{
        const link = item.getAttribute("link-id-item");
        const newPos = item.value;
        fetch(link, {
          method : "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify({
            newPos : newPos
          })
        })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200)
            console.log("ok");
        })
      });
    });
}
// End Change Position


// Restore
const listButtonRestore = document.querySelectorAll("[restore-item]");
if(listButtonRestore.length > 0){
  listButtonRestore.forEach((item)=>{
    item.addEventListener("click", ()=>{
      const link = item.getAttribute("link-id-button-trash");
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          window.location.reload();
        }
      })
    });
  });
}
// End Restore

// Xoa vinh vien
const listButtonDeletePer = document.querySelectorAll("[permanently-deleted]");
if(listButtonDeletePer.length > 0){
  listButtonDeletePer.forEach((item) => {
    item.addEventListener("click", ()=>{
      let check = confirm("Bạn chắc chắn xóa ?");
      if(check){
        const link = item.getAttribute("link-id-button-trash");
        fetch(link, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200)
            window.location.reload();
        })
      }
    });
  });
}
// End Xoa vinh vien

// An thong bao khi thay doi trang thai san pham
const hidden = document.querySelector("[show-alert]");
if(hidden){
  console.log(hidden);
  let time = hidden.getAttribute("show-alert") || 3000;
  time = parseInt(time);
  setTimeout(()=>{
    hidden.classList.add("hidden");
  }, time);
}
// End an thong bao khi thay doi trang thai san pham


// preview anh trong form ben admin

const divImage = document.querySelector("[upload-image]");
if(divImage){
  const imageInput = divImage.querySelector("[upload-image-input]"); 
  const imagePreview = divImage.querySelector("[upload-image-preview]");
  if(imageInput){
    imageInput.addEventListener("change", ()=>{
      const file = imageInput.files[0];
      if(file){
        imagePreview.src = URL.createObjectURL(file);
      }
    });
  } 
}

// End preview anh trong form ben admin

// Sap xep san pham theo cac tieu chi, va css lai option khi load lai trang
const sort = document.querySelector("[sort]");
if(sort){
  let url = new URL(window.location.href);
  const select = sort.querySelector("select");
  select.addEventListener("change", ()=>{
    const [sortKey, sortValue] = select.value.split("-");  
    if(sortKey && sortValue){
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
    }
    window.location.href = url.href;
  });
}

const defaultKey = url.searchParams.get('sortKey');
const defaultValue = url.searchParams.get('sortValue');
if(defaultValue && defaultKey){
  const selected = document.querySelector(`option[value=${defaultKey}-${defaultValue}]`);
  selected.selected = true;
}

const clear = document.querySelector("button[sort-clear]");
if(clear){
  clear.addEventListener("click", ()=>{
    url.searchParams.delete('sortKey');
    url.searchParams.delete('sortValue');
    window.location.href = url.href;
  });
}
//End sap xep san pham theo cac tieu chi, va css lai option khi load lai trang


// Phan quyen cho nhom quyen
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions){
  let rolesArray = [];
  const buttonUpdate = document.querySelector("button[button-submit]");
  buttonUpdate.addEventListener("click", ()=>{
    const listRoles = tablePermissions.querySelectorAll("th[role-id]");
    listRoles.forEach((item)=>{
      const roleAndPermissions = {
        id : item.getAttribute("role-id"),
        permissions: []
      };
      const roles = tablePermissions.querySelectorAll(`input[data-id="${roleAndPermissions.id}"]:checked`);
      roles.forEach((item)=>{
        const permission = item.getAttribute("data-name");
        roleAndPermissions.permissions.push(permission);
      });
      rolesArray.push(roleAndPermissions);
    });
    const path = buttonUpdate.getAttribute("button-submit");
    fetch(path,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        rolesArray: rolesArray
      })
    })
      .then(res=> res.json())
      .then(data=>{
      if(data.code == 200){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  });
}
// End Phan quyen cho nhom quyen(Quan trong)

//Change status for accounts 
const listButtonChange = document.querySelectorAll(`button[data-status]`);
if(listButtonChange.length > 0){
  listButtonChange.forEach((item) => {
    item.addEventListener("click", () => {
      const link = item.getAttribute("link");
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(res=>res.json())
      .then(data => {
        if(data.code == 200)
          window.local.reload();
      })
    });
  });
}
// End Change status for accounts 

// Delete role admin 
const listButtonDeleteRole = document.querySelectorAll("[delete-role-id]");
if(listButtonDeleteRole.length > 0) {
  listButtonDeleteRole.forEach(item => {
    item.addEventListener("click", ()=>{
      const link = item.getAttribute("link");
      const data = {
        idRole: item.getAttribute("delete-role-id")
      };
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then(res=> res.json())
      .then(data => {
        if(data.code == 200)
          window.location.reload();
      })
      
    });
  });
} 
// End Delete role admin 

// Delete account admin
const listButtonDeleteAccount = document.querySelectorAll("[delete-account-id]");
if(listButtonDeleteAccount.length > 0) {
  listButtonDeleteAccount.forEach(item => {
    item.addEventListener("click", ()=>{
      const link = item.getAttribute("link");
      const data = {
        idAccount: item.getAttribute("delete-account-id")
      };
      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then(res=> res.json())
      .then(data => {
        if(data.code == 200)
          window.location.reload();
      })
      
    });
  });
} 
// End Delete account admin








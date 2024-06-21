
// filter producst

const listProducts = document.querySelectorAll("[button-status]");
let url = new URL(window.location.href);

listProducts.forEach((item)=>{
  item.addEventListener("click", ()=>{
    const status = item.getAttribute("button-status");
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
currentButton.classList.add("active");

// end filter producst


//Search products

const search = document.querySelector("[form-search]");
if(search){
  let url = new URL(window.location.href);
  search.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngan cho form load lai trang(Mac dinh cua form khi submit la load lai trang)
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
  if(numPageOnUrl > listPagination.length){
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
      alert("Loi");
  });
}

// Delete item
const listButtonDelete = document.querySelectorAll("[link-id-button]");
if(listButtonDelete.length > 0){
  listButtonDelete.forEach((item) => {
    item.addEventListener("click", ()=> {
      const link = item.getAttribute("link-id-button");
      console.log(link);
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







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





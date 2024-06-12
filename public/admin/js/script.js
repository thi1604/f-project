
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
search.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = event.target.elements.keyword.value;
  let url = new URL(window.location.href);
  if(keyword){
    url.searchParams.set("keyword", keyword);
  }
  else
    url.searchParams.delete("keyword");
  window.location.href = url.href;
});

//End Search products





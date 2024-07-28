
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


// Thay doi so luong san pham cua gio hang

const tableCart = document.querySelector("table[cart]");
if(tableCart){
  const products = tableCart.querySelectorAll("td input[change-quantity-item]");

  products.forEach(item => {
    item.addEventListener("change", () => {
      const productId = item.getAttribute("item-id");
      const quantity = parseInt(item.value);
      console.log(quantity);
      if(productId &&  quantity > 0){
        window.location.href = `/cart/update/${productId}/${quantity}`;
      }
    });
  });
}

// End Thay doi so luong san pham cua gio hang
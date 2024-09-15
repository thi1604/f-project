
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

// Chon tat ca san pham ben cart
const chooseAll = document.querySelector("input[choose-all-cart]");
if(chooseAll){
  chooseAll.addEventListener("click", () => {
    const check = chooseAll.checked;
    const listProducts = tableCart.querySelectorAll("td input[product-in-cart]");
    if(listProducts.length > 0){
      const arrayProductId = [];
      listProducts.forEach(item => {
        item.checked = check;
        if(check == true)
          arrayProductId.push(item.getAttribute("product-id"));
      });
      // callAPI tinh tong tien trong gio hang
      const path = "/cart/detail";
      fetch(path,{
        method : "PATCH",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(arrayProductId)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200)
            window.location.reload();
        })
    }
  });
}
// End Chon tat ca san pham ben cart


// Check choose all

if(chooseAll){
  const listProducts = tableCart.querySelectorAll("td input[product-in-cart]");
  const lengthAll = listProducts.length;
  listProducts.forEach(item=> {
    item.addEventListener("click", ()=>{
      const listProductsChooosed = tableCart.querySelectorAll("td input[product-in-cart]:checked");
      // Call api cho cac san pham checked de hien thi ra giao dien
      const arrayProductId = [];
      listProductsChooosed.forEach(item => {
        arrayProductId.push(item.getAttribute("product-id"));
      });

      const path = "/cart/detail";
      fetch(path,{
        method : "PATCH",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(arrayProductId)
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200)
            window.location.reload();
        })
      
      if(lengthAll > 0 && lengthAll == listProductsChooosed.length){
          chooseAll.checked = true;
        }
        else
          chooseAll.checked = false;
    });
  });
}

// End Check choose all


// Chon san pham ben cart

// if(chooseAll){
//   const listProducts = tableCart.querySelectorAll("td input[product-in-cart]");
//   if(listProducts.length > 0){
//     listProducts
//   }
// }

// End Chon san pham ben cart

//preview img in form
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
//End preview img in form
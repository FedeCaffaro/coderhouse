const socket = io();
const addForm = document.getElementById("add-realtimeproducts-form");
const productListContainer = document.getElementById("product-list-container");
const deleteForm = document.getElementById("delete-realtimeproducts-form");
// import ProductManager from "../../managers/ProductManager";

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(addForm);

  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "manual",
  };

  fetch("http://localhost:8080/realtimeproducts", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  addForm.reset();
});

socket.on("newProduct", (data) => {
  console.log("Event new product listened");
  const newProductFragment = document.createElement("div");
  if (!data.thumbnail.length) {
    newProductFragment.innerHTML = `
        <div id="product-item">
            <p id="title">${data.title}</p>
            <p>${data.description}</p>
            <p>$${data.price}</p>
            <p id="no-image">no image</p>
        </div>`;
  } else {
    newProductFragment.innerHTML = `
        <div id="product-item">
            <p id="title">${data.title}</p>
            <p>${data.description}</p>
            <p>$${data.price}</p>
            <div class="thumbnail-container">
                <img src="${data.thumbnail[0]}" alt="">
            </div>
        </div>`;
  }

  productListContainer.append(newProductFragment);
});

function removeDiv(id) {
  // const productManager = new ProductManager("./src/Database/Products.json");
  // const deletedProduct = await productManager.deleteProduct(id);
  socket.emit("deleteProduct", id);
  const elem = document.getElementById(id);
  elem.remove();
  console.log("Removed");
}

socket.on("deleteProduct", (data) => {
  console.log("Event new product deleted");
  // console.log(data);
  // const elem = document.getElementById(data);
  // elem.remove();
});

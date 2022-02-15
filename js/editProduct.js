import { getToken } from "./storage.js";
import { createNavMenu } from "./createNavMenu.js";
import { logout } from "./logout.js";
import { deleteProduct } from "./deleteProduct.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = "http://localhost:1337";
const url = "http://localhost:1337/products/";

const productUrl = url + id;

const token = getToken();

createNavMenu();
logout();

if (!token) {
  location.href = "/";
}
const productImg = document.querySelector(".product-img");
const editForm = document.querySelector(".edit-item-form");
const productName = document.getElementById("productNameInput");
const toggleFeatured = document.getElementById("toggleFeatured");
const price = document.getElementById("priceInput");
const description = document.getElementById("descInput");
const idInput = document.getElementById("idInput");
const editItemError = document.getElementById("edit-error");
const loadingMsg = document.getElementById("loading");
const imgUpload = document.getElementById("img-upload");
const imgRefId = document.getElementById("imageRefId");

async function fetchProductToEdit() {
  try {
    const response = await fetch(productUrl);
    const product = await response.json();
    console.log(product);

    productImg.innerHTML = `<img src="${baseUrl}${product.image.url}" style="width:300px"></img>`;

    productName.value = product.title;
    toggleFeatured.checked = product.featured;
    price.value = product.price;
    description.value = product.description;
    idInput.value = product.id;
    imgRefId.value = product.image.id;

    deleteProduct(product.id);

    console.log(product.featured);
  } catch (error) {
    editItemError.innerHTML = `An error occured: ${error}`;
    loadingMsg.style.display = "none";
  } finally {
    editForm.style.display = "block";
    loadingMsg.style.display = "none";
  }
}
fetchProductToEdit();

editForm.addEventListener("submit", sumbitEditForm);

function sumbitEditForm(e) {
  e.preventDefault();

  const nameValue = productName.value.trim();
  const featuredValue = toggleFeatured.checked;
  const priceValue = parseFloat(price.value);
  const descValue = description.value.trim();
  const idValue = parseInt(idInput.value);
  const imgUploadValue = imgUpload;

  console.log(imgUploadValue);

  // const data = {
  //   id: idValue,
  //   title: nameValue,
  //   description: descValue,
  //   price: priceValue,
  //   featured: featuredValue,
  //   img: imgUploadValue,
  // };
  // console.log(data);
  updateProduct(nameValue, descValue, priceValue, featuredValue, idValue);
}

async function updateProduct(title, description, price, featured, id) {
  const data = JSON.stringify({ title: title, description: description, price: price, featured: featured });

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(productUrl, options);
    const json = await response.json();

    if (json.updated_at) {
      console.log("success");
    }
  } catch (error) {
    console.log(error);
  }
}

const uploadForm = document.getElementById("upload-form");

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewProductImg();
  console.log("Updating product img");
});

async function addNewProductImg() {
  const token = getToken();
  const uploadUrl = "http://localhost:1337/upload/";

  const options = {
    method: "POST",
    body: new FormData(uploadForm),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(options);

  try {
    const response = await fetch(uploadUrl, options);
    const json = await response.json();

    if (json.created_at) {
      console.log("Success");
    }
  } catch (error) {
    console.log("error");
  }
}

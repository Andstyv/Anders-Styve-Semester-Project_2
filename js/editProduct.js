import { getToken } from "./storage.js";
import { createNavMenu } from "./createNavMenu.js";
import { logout } from "./logout.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "http://localhost:1337/products/";

const productUrl = url + id;

const token = getToken();

createNavMenu();
logout();

if (!token) {
  location.href = "/";
}

const editForm = document.querySelector(".edit-item-form");
const productName = document.getElementById("productNameInput");
const toggleFeatured = document.getElementById("toggleFeatured");
const price = document.getElementById("priceInput");
const description = document.getElementById("descInput");
const productImg = document.getElementById("productImgInput");
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

    productName.value = product.title;
    toggleFeatured.checked = product.featured;
    price.value = product.price;
    description.value = product.description;
    idInput.value = product.id;
    productImg.value = product.image.url;
    imgRefId.value = product.image.id;

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

  const data = {
    id: idValue,
    title: nameValue,
    description: descValue,
    price: priceValue,
    featured: featuredValue,
    img: imgUploadValue,
  };
  console.log(data);
}

const uploadForm = document.getElementById("upload-form");

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addItem();

  console.log("sending?");
});

async function addItem() {
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

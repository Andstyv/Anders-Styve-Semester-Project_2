import { getToken } from "./utils/storage.js";
import { createNavMenu } from "./components/createNavMenu.js";
import { logout } from "./components/logout.js";
import { deleteProduct } from "./components/deleteProduct.js";
import { addNewProductImg } from "./components/uploadProductImg.js";
import { baseUrl, productsUrl } from "./utils/APIUrls.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const productUrl = productsUrl + "/" + id;
const token = getToken();

createNavMenu();
logout();

if (!token) {
  location.href = "/";
}

const productImg = document.querySelector(".edit-content__img");
const editForm = document.querySelector(".edit-form");
const productName = document.getElementById("productNameInput");
const toggleFeatured = document.getElementById("toggleFeatured");
const price = document.getElementById("priceInput");
const description = document.getElementById("descInput");
const idInput = document.getElementById("idInput");
const editItemError = document.getElementById("edit-content__error");
const loadingMsg = document.getElementById("loading");
const imgRefId = document.getElementById("imageRefId");
const imgUploadBtn = document.getElementById("upload-img-btn");
const uploadForm = document.querySelector(".upload-form");
const uploadExitBtn = document.querySelector(".upload-form__exit");

imgUploadBtn.addEventListener("click", toggleUploadModal);
uploadExitBtn.addEventListener("click", toggleUploadModal);

function toggleUploadModal() {
  uploadForm.classList.toggle("show-modal");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    uploadForm.classList.remove("show-modal");
  }
});

export async function fetchProductToEdit() {
  try {
    const response = await fetch(productUrl);
    const product = await response.json();

    const hasImage = product.image;

    productImg.innerHTML = `<img src="${hasImage ? baseUrl + product.image.url : "#"}" alt="${hasImage ? product.image.alternativeText : ""}"></img>`;

    productName.value = product.title;
    toggleFeatured.checked = product.featured;
    price.value = product.price;
    description.value = product.description;
    idInput.value = product.id;
    imgRefId.value = product.id;

    deleteProduct(product.id);
  } catch (error) {
    editItemError.innerHTML = `An error occured: ${error}`;
    loadingMsg.style.display = "none";
  } finally {
    editForm.style.display = "flex";
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

  updateProduct(nameValue, descValue, priceValue, featuredValue, idValue);
}

async function updateProduct(title, description, price, featured, id) {
  const data = JSON.stringify({ title: title, description: description, price: price, featured: featured });
  const editConfMsg = document.querySelector(".edit-form__msg");

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
      editConfMsg.classList.add("edit-form__msg--green");
      editConfMsg.innerHTML = `<i class="far fa-check-circle"></i> Successfully updated`;
    }
  } catch (error) {
    editConfMsg.classList.add("edit-form__msg--red");
    editConfMsg.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Error: ${error}`;
  }
}

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewProductImg();
});

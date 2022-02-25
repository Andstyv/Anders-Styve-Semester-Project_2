import { getToken, getUserName } from "../utils/storage.js";

const baseUrl = "http://localhost:1337/products";

export function addNewProduct() {
  const addContainer = document.querySelector(".add-container");
  addContainer.innerHTML = "";

  const username = getUserName();

  if (username) {
    addContainer.innerHTML = `<button class="btn-main" id="add-new">+ Add new product</button>`;

    const addBtn = document.getElementById("add-new");

    addBtn.onclick = function () {
      addBtn.style.display = "none";
      addContainer.innerHTML += `
          <div id="add-error"></div>
          <form class="add-form">
          <button class="btn-main" id="add-close-btn">Close</button>
          <h3 class="add-form__title">Add a new product below</h3>
          <div>
          <label for="productNameInput">Product Name</label>
          <input type="text" minlength="4" required id="productNameInput" placeholder="Product Name" />
        </div>
        <div>
          <label for="toggleFeatured">Featured</label>
          <input type="checkbox" id="toggleFeatured" />
        </div>
        <div>
          <label for="priceInput">Product Price</label>
          <input type="number" step="0.01" required id="priceInput" placeholder="Product Price" />
        </div>
        <div>
          <label for="descInput">Description</label>
          <textarea type="text" minlength="10" required id="descInput" placeholder="Description"></textarea>
        </div>
        <div class="edit-conf-msg"></div>
<button type="submit" class="btn-secondary" id="add-btn">Add</button>
</form>`;
      const form = document.querySelector("form");
      const closeBtn = document.getElementById("add-close-btn");
      closeBtn.onclick = function () {
        addBtn.style.display = "flex";
        addContainer.innerHTML = `<button class="btn-main" id="add-new">+ Add new product</button>`;
        addNewProduct();
      };
      form.addEventListener("submit", submitAddForm);
    };
  }
}

function submitAddForm(e) {
  e.preventDefault();
  console.log("added");

  const productName = document.getElementById("productNameInput");
  const featured = document.getElementById("toggleFeatured");
  const price = document.getElementById("priceInput");
  const desc = document.getElementById("descInput");

  const nameValue = productName.value.trim();
  const featuredValue = featured.checked;
  const priceValue = parseFloat(price.value);
  const descValue = desc.value.trim();

  addProductDetails(nameValue, featuredValue, priceValue, descValue);
}

async function addProductDetails(name, featured, price, desc) {
  const data = JSON.stringify({ title: name, featured: featured, price: price, description: desc });
  const editConfMsg = document.querySelector(".edit-conf-msg");

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(baseUrl, options);
    const json = await response.json();

    if (json.created_at) {
      console.log("New product added");
      editConfMsg.classList.add("edit-green");
      editConfMsg.innerHTML = `<i class="far fa-check-circle"></i> Successfully updated`;
    }
  } catch (error) {
    console.log(error);
    editConfMsg.classList.add("edit-red");
    editConfMsg.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Error: ${error}`;
  }
}

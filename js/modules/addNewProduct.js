import { getToken, getUserName } from "../utils/storage.js";

const baseUrl = "http://localhost:1337/products";

export function addNewProduct() {
  const addContainer = document.querySelector(".add-container");
  addContainer.innerHTML = "";

  const username = getUserName();

  if (username) {
    addContainer.innerHTML = `<button id="add-new">Add new</button>`;

    const addBtn = document.getElementById("add-new");

    addBtn.onclick = function () {
      addContainer.innerHTML += `
          <div id="add-error"></div>
          <form class="add-form">
          <div>
          <label for="productNameInput">Product Name</label>
          <input type="text" id="productNameInput" placeholder="Product Name" />
        </div>
        <div>
          <label for="toggleFeatured">Featured</label>
          <input type="checkbox" id="toggleFeatured" />
        </div>
        <div>
          <label for="priceInput">Product Price</label>
          <input type="number" step="0.01" id="priceInput" placeholder="Product Price" />
        </div>
        <div>
          <label for="descInput">Description</label>
          <textarea type="text" id="descInput" placeholder="Description"></textarea>
        </div>
          <div>
            <button type="submit" id="add-btn">Add</button>
          </div></form>`;
      const form = document.querySelector("form");
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
    const json = await response.json;

    if (json.created_at) {
      console.log("New product added");
    }
  } catch (error) {
    console.log(error);
  }
}

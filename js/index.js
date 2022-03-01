import { createNavMenu } from "./components/createNavMenu.js";
import { itemsInCartTracker } from "./components/itemsInCartTracker.js";
import { logout } from "./components/logout.js";
import { renderProducts } from "./components/renderProducts.js";
import { baseUrl, productsUrl } from "./utils/APIUrls.js";

createNavMenu();
itemsInCartTracker();

export async function fetchFeaturedProducts() {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();

    let products = json;

    const featuredProducts = products.filter(function (product) {
      if (product.featured) {
        return true;
      }
    });

    renderProducts(featuredProducts);
    logout();
  } catch (error) {
    console.log(error);
  }
}

fetchFeaturedProducts();

async function fetchHeaderImg() {
  const img = document.querySelector(".bg-grid__headerimg");
  try {
    const headerImgUrl = baseUrl + "/home/";

    const response = await fetch(headerImgUrl);
    const json = await response.json();

    let headerImg = json;

    img.innerHTML = `<img class="bg-grid__headerimg--img" src="${baseUrl}${headerImg.hero_banner.url}" alt="${headerImg.hero_banner_alt_text}" />`;
  } catch (error) {
    console.log(error);
    img.innerHTML = `<div>Error: ${error}</div>`;
  }
}
fetchHeaderImg();

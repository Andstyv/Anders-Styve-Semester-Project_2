import { createNavMenu } from "./modules/createNavMenu.js";
import { logout } from "./modules/logout.js";
import { renderProducts } from "./modules/renderProducts.js";

const url = "http://localhost:1337";

createNavMenu();

export async function fetchFeaturedProducts() {
  try {
    const productsURL = url + "/products/";

    const response = await fetch(productsURL);
    const json = await response.json();

    let products = json;

    const featuredProducts = products.filter(function (product) {
      if (product.featured) {
        return true;
      }
    });
    console.log(featuredProducts);
    console.log(products);
    renderProducts(featuredProducts);
    logout();
  } catch (error) {
    console.log(error);
  }
}

fetchFeaturedProducts();

async function fetchHeaderImg() {
  try {
    const headerImgUrl = url + "/home/";
    const img = document.querySelector(".bg-img");

    const response = await fetch(headerImgUrl);
    const json = await response.json();

    let headerImg = json;

    img.innerHTML = `<img class="img1" src="${url}${headerImg.hero_banner.url}" alt="${headerImg.hero_banner_alt_text}" />`;
    console.log(headerImg);
  } catch (error) {
    console.log(error);
  }
}
fetchHeaderImg();

import { renderProducts } from "./renderProducts.js";

export function filterProducts(products) {
  const searchFilter = document.getElementById("filter-products");
  const filterContainer = document.querySelector(".products-container");

  searchFilter.onkeyup = function (e) {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue) {
      const filteredProducts = products.filter(function (product) {
        if (product.title.toLowerCase().indexOf(searchValue) > -1) {
          return true;
        }
      });
      if (!filteredProducts.length) {
        filterContainer.innerHTML = `<div id="filter-empty-text">No products found</div>`;
      } else {
        renderProducts(filteredProducts);
      }
    } else {
      renderProducts(products);
    }
  };
}

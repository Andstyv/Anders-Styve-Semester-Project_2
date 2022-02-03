const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "http://localhost:1337/products/";
const productUrl = url + id;
const container = document.querySelector(".container");

async function fetchProductById(url) {
  try {
    const response = await fetch(url);
    const product = await response.json();

    console.log(product);
    container.innerHTML = `<h1>${product.title}</h1>`;
  } catch (error) {
    console.log(error);
  }
}

fetchProductById(productUrl);

const url = "http://localhost:1337";

export function renderProducts(productsToRender) {
  const container = document.querySelector(".container");

  container.innerHTML = "";

  productsToRender.forEach((product) => {
    console.log(product.image);
    container.innerHTML += `<div class="product__card">
                            <img class="product__img" src="${url}${product.image.url}"></img>
                            <h3 class="product__title">${product.title}</h3>
                            <p class="product__price">Price: ${product.price}</p>
                            <a class ="product__link" href="product.html?id=${product.id}" >Link to product</a></div>
                            `;
  });
}

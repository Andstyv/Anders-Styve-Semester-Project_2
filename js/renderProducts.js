export function renderProducts(productsToRender) {
  const container = document.querySelector(".container");

  container.innerHTML = "";

  productsToRender.forEach((product) => {
    container.innerHTML += `<div>${product.title}</div>`;
  });
}

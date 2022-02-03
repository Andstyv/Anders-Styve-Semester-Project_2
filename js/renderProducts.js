const url = "http://localhost:1337";

export function renderProducts(productsToRender) {
  const container = document.querySelector(".container");

  container.innerHTML = "";

  productsToRender.forEach((product) => {
    console.log(product.image);
    container.innerHTML += `<img src="${url}${product.image.url}" style=width:20%></img>
                            <h3>${product.title}</h3>
                            <p>Price: ${product.price}</p>
                            <a href="product.html?id=${product.id}" >Link to product</a>
                            `;
  });
}

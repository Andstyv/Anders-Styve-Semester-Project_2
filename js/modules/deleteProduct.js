import { getToken } from "../utils/storage.js";

export function deleteProduct(id) {
  const deleteBtn = document.querySelector(".delete-btn");

  deleteBtn.onclick = async function () {
    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
      const token = getToken();
      const deleteUrl = "http://localhost:1337/products/" + id;

      const options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(deleteUrl, options);
        const json = await response.json();
        location.href = "/products.html";
      } catch (error) {
        console.log(error);
      }
    }
  };
}

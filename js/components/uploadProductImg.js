import { getToken } from "../utils/storage.js";
import { fetchProductToEdit } from "../editProduct.js";
import { uploadUrl } from "../utils/APIUrls.js";

export async function addNewProductImg() {
  const uploadForm = document.querySelector(".upload-form");
  const token = getToken();
  const uploadFiles = document.getElementById("inputFiles");

  const options = {
    method: "POST",
    body: new FormData(uploadForm),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(uploadUrl, options);
    const json = await response.json();

    if (json[0].created_at) {
      uploadFiles.value = "";
      fetchProductToEdit();
      uploadForm.classList.toggle("show-modal");
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    uploadForm.innerHTML = `Error: ${error}`;
  }
}

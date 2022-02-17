import { getToken } from "../utils/storage.js";
import { fetchProductToEdit } from "../editProduct.js";

export async function addNewProductImg() {
  const uploadForm = document.getElementById("upload-form");
  const token = getToken();
  const uploadUrl = "http://localhost:1337/upload/";
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
      console.log("Img upload success");
      uploadFiles.value = "";
      fetchProductToEdit();
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

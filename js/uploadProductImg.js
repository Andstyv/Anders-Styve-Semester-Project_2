import { fetchProductToEdit } from "./editProduct.js";
import { getToken } from "./storage.js";

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
  console.log(options);

  try {
    const response = await fetch(uploadUrl, options);
    const json = await response.json();

    console.log(json);
    console.log(json[0].created_at);

    if (json[0].created_at) {
      console.log("Success");
      console.log(uploadFiles);

      uploadFiles.value = "";
      fetchProductToEdit();
    }
  } catch (error) {
    console.log("error");
  }
}

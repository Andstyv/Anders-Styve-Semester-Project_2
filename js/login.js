import { createNavMenu } from "./modules/createNavMenu.js";
import { saveToken, saveUser } from "./utils/storage.js";

const url = "http://localhost:1337";

const loginForm = document.querySelector(".login-form");
const username = document.getElementById("usernameInput");
const password = document.getElementById("passwordInput");
const errorContainer = document.getElementById("login-form__error");

loginForm.addEventListener("submit", submitLoginForm);

createNavMenu();

function submitLoginForm(e) {
  e.preventDefault();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  tryToLogin(usernameValue, passwordValue);
}

async function tryToLogin(username, password) {
  const loginUrl = url + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(loginUrl, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/";
    }
    if (json.error) {
      errorContainer.innerHTML = `Error: ${json.message[0].messages[0].message}`;
    }
  } catch (error) {
    errorContainer.innerHTML = `Error: ${error}`;
  }
}

const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

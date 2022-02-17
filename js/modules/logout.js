export function logout() {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.onclick = function () {
      const confirmLogout = confirm("Are you sure you want to log out?");

      if (confirmLogout) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        location.href = "/";
      }
    };
  }
}

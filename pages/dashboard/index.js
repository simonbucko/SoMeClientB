const logoutLink = document.getElementById("logoutLink");

logoutLink.addEventListener("click", () => {
    sessionStorage.removeItem("user")
})
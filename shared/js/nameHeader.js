const profileEmail = document.querySelector("#profileEmail")
const profile = JSON.parse(sessionStorage.getItem("user"))

profileEmail.innerText = `You are logged as: ${profile.email}`
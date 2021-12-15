import { SERVER_URL } from "../../shared/js/constants.js"
const loginForm = document.querySelector("#signupForm")
const errorMsg = document.querySelector("#errorMsg")


loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    errorMsg.style.display = "none"
    const loginData = {
        email: loginForm.femail.value,
        password: loginForm.fpassword.value,
    }
    fetch(`${SERVER_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
        .then(response => response.json()
        )
        .then(data => {
            //hadle error when duplicates occurs
            if (data?.status === 500) {
                errorMsg.style.display = "block";
            }
            else {
                sessionStorage.setItem("user", JSON.stringify(data))
                window.location.replace(`${window.location.origin}/pages/dashboard`);
            }
        })
        .catch(error => {
            errorMsg.style.display = "block"
            console.log(error)
        });
})
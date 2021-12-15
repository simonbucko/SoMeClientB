import { SERVER_URL, SRC_HOST, ADD } from "../../shared/js/constants.js"
const requestForm = document.querySelector("#requestForm")
const statusMsg = document.querySelector("#statusMsg")


requestForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const { email } = JSON.parse(sessionStorage.getItem("user"));
    const requestData = {
        method: ADD,
        sender: email,
        srcHost: SRC_HOST,
        recipient: requestForm.femail.value,
        rcpHost: requestForm.fhost.value,
        version: 1
    }
    fetch(`${SERVER_URL}/api/response`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json()
        )
        .then(data => {
            statusMsg.style.display = "block"
            //case that friendship has been already sent 
            if (data.status === 201) statusMsg.style.color = "orange"
            statusMsg.innerText = data.phrase
            requestForm.reset()
        })
        .catch(error => {
            console.log(error)
            statusMsg.style.display = "block"
            statusMsg.style.color = "red"
            statusMsg.innerText = "Opps, some error occured"
        });
})
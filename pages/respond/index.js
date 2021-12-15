import { SERVER_URL, ACCEPT, DENY, SRC_HOST } from "../../shared/js/constants.js"
let requestsReceived = [];

window.addEventListener("load", () => {
    fetchAndRenderFriendsList();
})

const fetchAndRenderFriendsList = async () => {
    const { id } = JSON.parse(sessionStorage.getItem("user"));
    const response = await fetch(`${SERVER_URL}/api/user?userId=${id}`);
    const data = await response.json();
    requestsReceived = data.requestsReceived;
    generateHtml(document.querySelector("tbody"), requestsReceived);
    attachClickListeners();
}

const generateHtml = (parentElement, requestsReceived) => {
    let HTML = ``;
    requestsReceived.forEach((request, i) => {
        HTML += `
        <tr data-rowindex=${i}>
            <th data-rowindex=${i}>${i}</th>
            <th data-rowindex=${i}>${request.email}</th>
            <th data-rowindex=${i}>${request.host}</th>
            <th><button class="acceptButton" data-rowindex=${i}>Accept</button></th>
            <th><button class="denyButton" data-rowindex=${i}>Deny</button></th>
        </tr>
        `
    });
    parentElement.innerHTML = HTML;
}

const attachClickListeners = () => {
    const acceptButtons = document.querySelectorAll("button.acceptButton");
    const denyButtons = document.querySelectorAll("button.denyButton");
    Array.from(acceptButtons).forEach(button => {
        button.addEventListener("click", (e) => {
            handleAccept(e.target.getAttribute('data-rowindex'))
        })
    })
    Array.from(denyButtons).forEach(button => {
        button.addEventListener("click", (e) => {
            handleDeny(e.target.getAttribute('data-rowindex'))
        })
    })
}

const handleAccept = async (requestIndex) => {
    const request = requestsReceived[requestIndex];
    const { email } = JSON.parse(sessionStorage.getItem("user"));
    const requestData = {
        method: ACCEPT,
        sender: email,
        srcHost: SRC_HOST,
        recipient: request.email,
        rcpHost: request.host,
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
            fetchAndRenderFriendsList();
            alert(data.phrase)
        })
        .catch(error => {
            console.log(error)
        });
}

const handleDeny = async (requestIndex) => {

}
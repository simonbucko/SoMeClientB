import { SERVER_URL } from "../../shared/js/constants.js"
let requestsSent = [];

window.addEventListener("load", () => {
    fetchAndRenderFriendsList();
})

const fetchAndRenderFriendsList = async () => {
    const { id } = JSON.parse(sessionStorage.getItem("user"));
    const response = await fetch(`${SERVER_URL}/api/user?userId=${id}`);
    const data = await response.json();
    requestsSent = data.requestsSent;
    generateHtml(document.querySelector("tbody"), requestsSent);
}

const generateHtml = (parentElement, requestsSent) => {
    let HTML = ``;
    requestsSent.forEach((request, i) => {
        HTML += `
        <tr data-rowindex=${i}>
            <th data-rowindex=${i}>${i}</th>
            <th data-rowindex=${i}>${request.email}</th>
            <th data-rowindex=${i}>${request.host}</th>
            <th data-rowindex=${i}>${request.status}</th>
        </tr>
        `
    });
    parentElement.innerHTML = HTML;
}
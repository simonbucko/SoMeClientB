import { SERVER_URL } from "../../shared/js/constants.js"
let friendsList = [];

window.addEventListener("load", () => {
    fetchAndRenderFriendsList();
})

const fetchAndRenderFriendsList = async () => {
    const { id } = JSON.parse(sessionStorage.getItem("user"));
    const response = await fetch(`${SERVER_URL}/api/user?userId=${id}`);
    const data = await response.json();
    friendsList = data.friends;
    generateHtml(document.querySelector("tbody"), friendsList);
}

const generateHtml = (parentElement, friendsList) => {
    let HTML = ``;
    friendsList.forEach((friend, i) => {
        HTML += `
        <tr data-rowindex=${i}>
            <th data-rowindex=${i}>${i}</th>
            <th data-rowindex=${i}>${friend.email}</th>
            <th data-rowindex=${i}>${friend.host}</th>
        </tr>
        `
    });
    parentElement.innerHTML = HTML;
}
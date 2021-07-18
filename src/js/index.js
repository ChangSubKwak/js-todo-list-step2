//import User from "./component/User.js"
// const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com"
import { BASE_URL } from "../constant.js";
import { $ } from "../util/selectors.js";

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

console.log("BASE_URL", BASE_URL);

let userList;
let selectIdx = 0;

async function getUserList() {
  await fetch(`${BASE_URL}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .then(json => {
    userList = json;
  });
}

function addUserList() {
  $("#user-list").innerHTML = '';
  userList.forEach(element => {
    $("#user-list").innerHTML += `<button class="ripple">${element.name}</button>`;
  });
  $("#user-list").firstElementChild.classList.add("active");

  Object.entries($("#user-list").children).forEach(element => {
    element[1].addEventListener("click", ({ target }) => {
      console.log("target", target);
      $("#user-list").children[selectIdx].classList.remove("active");
      $("#user-list").children[element[0]].classList.add("active");
    });
  });
}

await getUserList();
addUserList();

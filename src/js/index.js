import { BASE_URL } from "../constant.js";
import { $ } from "../util/selectors.js";

let userList;
let selectIdx = 0;
// let userNameByInput;

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  createUser(userName);
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

console.log("BASE_URL", BASE_URL);

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

function viewUserCreateAndDeleteButton() {
  $("#user-list").innerHTML += `
    <button class="ripple user-create-button" data-action="createUser">
      + 유저 생성
    </button>
    <button class="ripple user-delete-button" data-action="deleteUser">
      삭제 -
    </button>
    `;
  
  $(".user-create-button").addEventListener("click", onUserCreateHandler);

  $(".user-delete-button").addEventListener("click", () => {
    console.log("user-delete-button");
  });
}

function viewUserList() {
  $("#user-list").innerHTML = '';
  userList.forEach(element => {
    $("#user-list").innerHTML += `<button class="ripple">${element.name}</button>`;
  });
  $("#user-list").firstElementChild.classList.add("active");

  viewUserCreateAndDeleteButton();

  const length = $("#user-list").children.length;
  Object.entries($("#user-list").children).forEach(element => {
    if (element[0] >= length - 2) {
      return;
    }
    console.log("element", element);

    element[1].addEventListener("click", () => {
      $("#user-list").children[selectIdx].classList.remove("active");
      $("#user-list").children[element[0]].classList.add("active");
      selectIdx = element[0];
    });
  });
}

async function createUser(userName) {
  await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify({
      name: userName
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => {
    if (json.name === undefined) {
      return;
    }

    let lastIdx = $("#user-list").children.length - 3;
    const lastChild = $("#user-list").children[lastIdx];
    lastChild.insertAdjacentHTML("afterend", `<button class="ripple">${json.name}</button>`);

    lastIdx = $("#user-list").children.length - 3;
    $("#user-list").children[selectIdx].classList.remove("active");
    $("#user-list").children[lastIdx].classList.add("active");
    selectIdx = lastIdx;
  });
}

// async function getTodoList() {
//   await fetch(`${BASE_URL}/api/users`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then(response => response.json())
//   .then(json => {
//     userList = json;
//   });
// }


await getUserList();
viewUserList();

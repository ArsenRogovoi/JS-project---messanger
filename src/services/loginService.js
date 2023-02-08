import { LOGIN_ERROR_CONTAINER, LOGIN_INPUT, PASSWORD_CHECK_BOX, PASSWORD_INPUT, } from "./domService.js";
import { startUserPage } from "./userPage.js";
export const showThePassword = () => {
    if (PASSWORD_CHECK_BOX.checked) {
        PASSWORD_INPUT.type = "text";
    }
    else {
        PASSWORD_INPUT.type = "password";
    }
};
export const checkLogin = () => {
    const usersJSON = localStorage.getItem("users");
    let users;
    if (typeof usersJSON === "string") {
        users = JSON.parse(usersJSON);
        if (users.find((user) => user.login === LOGIN_INPUT.value) &&
            users.find((user) => user.password === PASSWORD_INPUT.value)) {
            LOGIN_ERROR_CONTAINER.classList.remove("d-block");
            LOGIN_ERROR_CONTAINER.classList.add("d-none");
            data.CURRENT_USER.user = users.find((user) => user.login === LOGIN_INPUT.value);
            data.CURRENT_USER.state = "user page";
            startUserPage();
            LOGIN_INPUT.value = "";
            PASSWORD_INPUT.value = "";
        }
        else {
            LOGIN_ERROR_CONTAINER.classList.remove("d-none");
            LOGIN_ERROR_CONTAINER.classList.add("d-block");
        }
    }
};

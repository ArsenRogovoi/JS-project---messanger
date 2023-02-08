import { HAS_NOT_CHATS_DIV, USER_PAGE_CHAT_AREA, USER_PAGE_SEARCH_INPUT, } from "./domService.js";
import { showChat, showExistingChats } from "./userPage.js";
const searchChat = (numOfExistingChats) => {
    data.CURRENT_USER.state = "searching";
    HAS_NOT_CHATS_DIV.classList.remove("d-block");
    HAS_NOT_CHATS_DIV.classList.add("d-none");
    while (USER_PAGE_CHAT_AREA.hasChildNodes()) {
        USER_PAGE_CHAT_AREA.removeChild(USER_PAGE_CHAT_AREA.firstChild);
    }
    const input = USER_PAGE_SEARCH_INPUT.value;
    const usersJSON = localStorage.getItem("users");
    let users;
    if (typeof usersJSON === "string") {
        users = JSON.parse(usersJSON);
        users.forEach((user) => {
            if (user.login.includes(input) &&
                input &&
                user.login !== data?.CURRENT_USER?.user?.login) {
                showChat(user);
            }
        });
        if (input === "" && numOfExistingChats) {
            data.CURRENT_USER.state = "user page";
            showExistingChats();
        }
        else {
            HAS_NOT_CHATS_DIV.classList.remove("d-none");
            HAS_NOT_CHATS_DIV.classList.add("d-block");
            USER_PAGE_CHAT_AREA.appendChild(HAS_NOT_CHATS_DIV);
        }
    }
    data.CURRENT_USER.state = "user page";
};
export default searchChat;

import createChatLink from "../components/chatLink.js";
import PAGES from "../models/pageModel.js";
import { onChangePage } from "../routes/router.js";
import { fitHeight } from "../utils/algoMethods.js";
import { HAS_NOT_CHATS_DIV, USER_PAGE_CHAT_AREA, USER_PAGE_NAVBAR, USER_PAGE_NAV_BTN, USER_PAGE_SEARCH_INPUT, } from "./domService.js";
import startNavPage from "./navPage.js";
import searchChat from "./searchService.js";
export const startUserPage = () => {
    onChangePage(PAGES.ACCOUNT_PAGE);
    data.CURRENT_USER.state = "user page";
    data.CURRENT_CHAT = undefined;
    fitHeight(USER_PAGE_CHAT_AREA, [USER_PAGE_NAVBAR]);
    window.removeEventListener("storage", () => {
        checkIfHasChangeInChats();
    });
    window.addEventListener("storage", () => {
        checkIfHasChangeInChats();
    });
    let users;
    const usersJSON = localStorage.getItem("users");
    if (typeof usersJSON === "string") {
        users = JSON.parse(usersJSON);
        const currentUser = users.find((el) => {
            return el.id === data?.CURRENT_USER?.user?.id;
        });
        if (currentUser) {
            if (data.CURRENT_USER.datesOfLastMessages === undefined) {
                data.CURRENT_USER.datesOfLastMessages = [];
                const data1 = new Date(0);
                data.CURRENT_USER.datesOfLastMessages.push(data1);
            }
            if (!currentUser?.chats.length) {
                HAS_NOT_CHATS_DIV.classList.remove("d-none");
                HAS_NOT_CHATS_DIV.classList.add("d-block");
            }
            else {
                showExistingChats();
            }
            USER_PAGE_NAV_BTN.addEventListener("click", () => startNavPage());
            USER_PAGE_SEARCH_INPUT.addEventListener("input", () => searchChat(currentUser?.chats?.length));
        }
    }
};
export const showChat = (user, badgeCounter = 0) => {
    const chatLink = createChatLink(user, badgeCounter);
    const hr = document.createElement("hr");
    USER_PAGE_CHAT_AREA.appendChild(chatLink);
    USER_PAGE_CHAT_AREA.appendChild(hr);
};
export const showExistingChats = () => {
    while (USER_PAGE_CHAT_AREA.hasChildNodes()) {
        USER_PAGE_CHAT_AREA.removeChild(USER_PAGE_CHAT_AREA.firstChild);
    }
    let users;
    const usersJSON = localStorage.getItem("users");
    if (typeof usersJSON === "string") {
        users = JSON.parse(usersJSON);
        const currentUser = users.find((el) => {
            return el.id === data?.CURRENT_USER?.user?.id;
        });
        const existingChatsIds = currentUser?.chats;
        const specialChatArr = existingChatsIds?.map((chatId) => {
            let chats;
            const chatsJSON = localStorage.getItem("chats");
            if (typeof chatsJSON === "string") {
                chats = JSON.parse(chatsJSON);
                const chat = chats.find((ch) => {
                    return ch.id === chatId;
                });
                return [chat, chat?.messages[chat.messages.length - 1].date];
            }
            return undefined;
        });
        data.CURRENT_USER.datesOfLastMessages = specialChatArr?.map((el) => el[1]);
        while (specialChatArr.length) {
            let max = new Date(0);
            let index = -1;
            specialChatArr.forEach((el, ind) => {
                if (Date.parse(max.toString()) < Date.parse(el[1].toString())) {
                    max = el[1];
                    index = ind;
                }
            });
            const chatToShow = specialChatArr[index][0];
            const user = chatToShow.participants.filter((el) => el !== data?.CURRENT_USER?.user?.id)[0];
            let unreadMsgCounter = 0;
            chatToShow.messages.forEach((msg) => {
                if (!msg.hasRead) {
                    if (msg.from !== data.CURRENT_USER?.user?.id)
                        unreadMsgCounter++;
                }
            });
            const usersJSON = localStorage.getItem("users");
            if (typeof usersJSON === "string") {
                const users = JSON.parse(usersJSON);
                const userObj = users.find((el) => el.id === user);
                if (userObj) {
                    showChat(userObj, unreadMsgCounter);
                }
                specialChatArr.splice(index, 1);
            }
        }
    }
};
export const checkIfHasChangeInChats = () => {
    let chats;
    let users;
    const chatsJSON = localStorage.getItem("chats");
    const usersJSON = localStorage.getItem("users");
    if (typeof chatsJSON === "string" && typeof usersJSON === "string") {
        chats = JSON.parse(chatsJSON);
        users = JSON.parse(usersJSON);
        const currentUser = users.find((el) => {
            return el.id === data?.CURRENT_USER?.user?.id;
        });
        chats.forEach((ch) => {
            if (currentUser?.chats.includes(ch.id)) {
                const lastMsgOfCh = ch.messages[ch.messages.length - 1];
                let ifRender = true;
                data.CURRENT_USER.datesOfLastMessages.forEach((el) => {
                    if (Date.parse(el.toString()) > Date.parse(lastMsgOfCh.date.toString()))
                        ifRender = false;
                });
                if (ifRender && data.CURRENT_USER.state === "user page")
                    showExistingChats();
            }
        });
    }
};

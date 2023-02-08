import initialData from "./initialData/initialData.js";
import PAGES from "./models/pageModel.js";
import { onChangePage } from "./routes/router.js";
import { sendMsg, typingMsg } from "./services/chatPage.js";
import { CHAT_PAGE_BTN_TO_SEND_MSG, CHAT_PAGE_INPUT_MSG, NAV_PAGE_LOGOUT_LINK, } from "./services/domService.js";
import startingApp from "./services/startingApp.js";
startingApp();
initialData();
window.data = {
    CURRENT_USER: {
        datesOfLastMessages: [],
        user: undefined,
        state: "login page",
    },
    CURRENT_CHAT: undefined,
};
CHAT_PAGE_INPUT_MSG.addEventListener("input", () => typingMsg());
CHAT_PAGE_BTN_TO_SEND_MSG.addEventListener("click", () => sendMsg());
NAV_PAGE_LOGOUT_LINK.addEventListener("click", () => {
    onChangePage(PAGES.LOGIN_PAGE);
    data.CURRENT_CHAT = undefined;
    data.CURRENT_USER.user = undefined;
    data.CURRENT_USER.state = "login page";
    data.CURRENT_USER.datesOfLastMessages = [];
});

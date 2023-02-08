import PAGES from "../models/pageModel.js";
import { CHAT_PAGE, GREETING, LOGIN_FORM_CONTAINER, NAV_PAGE, USER_PAGE, } from "../services/domService.js";
export const onChangePage = (page) => {
    GREETING?.classList.remove("d-block");
    GREETING?.classList.add("d-none");
    LOGIN_FORM_CONTAINER?.classList.remove("d-block");
    LOGIN_FORM_CONTAINER?.classList.add("d-none");
    USER_PAGE?.classList.remove("d-block");
    USER_PAGE?.classList.add("d-none");
    NAV_PAGE?.classList.remove("d-block");
    NAV_PAGE?.classList.add("d-none");
    CHAT_PAGE?.classList.remove("d-block");
    CHAT_PAGE?.classList.add("d-none");
    switch (page) {
        case PAGES?.LOGIN_PAGE:
            GREETING?.classList.add("d-block");
            GREETING?.classList.remove("d-none");
            LOGIN_FORM_CONTAINER?.classList.add("d-block");
            LOGIN_FORM_CONTAINER?.classList.remove("d-none");
            break;
        case PAGES.ACCOUNT_PAGE:
            USER_PAGE?.classList.add("d-block");
            USER_PAGE?.classList.remove("d-none");
            break;
        case PAGES.NAV_PAGE:
            NAV_PAGE?.classList.add("d-block");
            NAV_PAGE?.classList.remove("d-none");
            break;
        case PAGES.CHAT_PAGE:
            CHAT_PAGE?.classList.add("d-block");
            CHAT_PAGE?.classList.remove("d-none");
            break;
        default:
            break;
    }
};
import { logOut } from "../app.js";
import PAGES from "../models/pageModel.js";
import { onChangePage } from "../routes/router.js";
import { USER_PROFILE_DELETE_BTN, USER_PROFILE_PAGE_BACK_ARROW, USER_PROFILE_PAGE_ID, USER_PROFILE_PAGE_LOGIN, USER_PROFILE_PAGE_MAIL, USER_PROFILE_PAGE_NAME, USER_PROFILE_PAGE_PHOTO, } from "./domService.js";
import { startUserPage } from "./userPage.js";
export const startUserProfilePage = () => {
    onChangePage(PAGES.USER_PROFILE_PAGE);
    USER_PROFILE_PAGE_BACK_ARROW.removeEventListener("click", startUserPage);
    USER_PROFILE_PAGE_BACK_ARROW.addEventListener("click", startUserPage);
    const currentUser = data.CURRENT_USER.user;
    USER_PROFILE_PAGE_PHOTO.setAttribute("src", `${currentUser?.photo}`);
    USER_PROFILE_PAGE_NAME.innerText = `${currentUser?.userName}`;
    USER_PROFILE_PAGE_LOGIN.innerText = `${currentUser?.login}`;
    USER_PROFILE_PAGE_MAIL.innerText = `${currentUser?.mail}`;
    USER_PROFILE_PAGE_ID.innerText = `${currentUser?.id}`;
    USER_PROFILE_DELETE_BTN.removeEventListener("click", () => {
        deleteProfile(data.CURRENT_USER.user);
    });
    USER_PROFILE_DELETE_BTN.addEventListener("click", () => {
        deleteProfile(data.CURRENT_USER.user);
    });
};
export const deleteProfile = (user) => {
    if (typeof user === "undefined")
        throw Error('variable "user" in deleteProfile function is undefined');
    const usersJSON = localStorage.getItem("users");
    const users = typeof usersJSON === "string" ? JSON.parse(usersJSON) : undefined;
    users.forEach((u, ind) => {
        if (u.id === user.id) {
            users.splice(ind, 1);
        }
    });
    logOut();
    localStorage.setItem("users", JSON.stringify(users));
};

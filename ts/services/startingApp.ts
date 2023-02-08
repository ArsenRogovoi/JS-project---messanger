import PAGES from "../models/pageModel.js";
import { onChangePage } from "../routes/router.js";
import { LOGIN_SUBMIT_BTN, PASSWORD_CHECK_BOX } from "./domService.js";
import { checkLogin, showThePassword } from "./loginService.js";

const startingApp = () => {
  onChangePage(PAGES.LOGIN_PAGE);
  PASSWORD_CHECK_BOX?.addEventListener("input", () => {
    showThePassword();
  });
  LOGIN_SUBMIT_BTN?.addEventListener("click", () => checkLogin());
};

export default startingApp;

import PAGES from "../models/pageModel.js";
import { onChangePage } from "../routes/router.js";
import { NAV_PAGE_BACK_ARROW } from "./domService.js";

const startNavPage = () => {
  onChangePage(PAGES.NAV_PAGE);
  NAV_PAGE_BACK_ARROW.addEventListener("click", () =>
    onChangePage(PAGES.ACCOUNT_PAGE)
  );
};

export default startNavPage;

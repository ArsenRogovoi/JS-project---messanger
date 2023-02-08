import PAGES from "../models/pageModel.js";
import { onChangePage } from "../routes/router.js";
import { NAV_PAGE_BACK_ARROW, NAV_PAGE_PROFILE_LINK } from "./domService.js";
import { startUserProfilePage } from "./userProfilePageService.js";

const startNavPage = () => {
  onChangePage(PAGES.NAV_PAGE);
  NAV_PAGE_BACK_ARROW.removeEventListener("click", () =>
    onChangePage(PAGES.ACCOUNT_PAGE)
  );
  NAV_PAGE_BACK_ARROW.addEventListener("click", () =>
    onChangePage(PAGES.ACCOUNT_PAGE)
  );
  NAV_PAGE_PROFILE_LINK.removeEventListener("click", () => {
    startUserProfilePage();
  });
  NAV_PAGE_PROFILE_LINK.addEventListener("click", () => {
    startUserProfilePage();
  });
};

export default startNavPage;

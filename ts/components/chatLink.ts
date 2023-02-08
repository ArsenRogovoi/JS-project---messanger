import User from "../models/userModel.js";
import { startChatPage } from "../services/chatPage.js";

const createChatLink = (user: User, badgeInnerText = 0) => {
  const rowChatLink = document.createElement("div");
  rowChatLink.classList.add("row", "m-0", "p-0");
  rowChatLink.id = `chat-link-${user.login}`;
  rowChatLink.addEventListener("click", () => {
    startChatPage(user);
  });

  const photoContainer = document.createElement("div");
  photoContainer.classList.add("col-3", "m-0", "p-0");

  const chatImg = document.createElement("img");
  chatImg.classList.add("rounded-circle", "w-75");
  chatImg.src = user.photo;
  chatImg.alt = "user-photo";

  photoContainer.appendChild(chatImg);

  const chatNameContainer = document.createElement("div");
  chatNameContainer.classList.add(
    "col-9",
    "m-0",
    "p-0",
    "d-flex",
    "align-items-center"
  );

  const chatName = document.createElement("p");
  chatName.classList.add("m-0", "p-0", "display-6");
  chatName.innerText = user.login;

  const badge = document.createElement("span");
  badge.classList.add("badge", "bg-success", "bg-gradient", "rounded-pill");
  if (badgeInnerText) badge.innerText = `${badgeInnerText}`;

  chatNameContainer.appendChild(chatName);
  chatName.appendChild(badge);

  rowChatLink.appendChild(photoContainer);
  rowChatLink.appendChild(chatNameContainer);

  return rowChatLink;
};

export default createChatLink;

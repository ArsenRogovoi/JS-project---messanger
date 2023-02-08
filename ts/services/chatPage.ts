import createChatMsg from "../components/chatMsg.js";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import PAGES from "../models/pageModel.js";
import User from "../models/userModel.js";
import { onChangePage } from "../routes/router.js";
import {
  fitHeight,
  haveSameElements,
  isHaveChat,
} from "../utils/algoMethods.js";
import {
  CHAT_PAGE_BACK_ARROW,
  CHAT_PAGE_BTN_TO_SEND_MSG,
  CHAT_PAGE_IMG_INTERLOCUTOR,
  CHAT_PAGE_INPUT_MSG,
  CHAT_PAGE_MESSAGES_AREA,
  CHAT_PAGE_NAME_INTERLOCUTOR,
  CHAT_PAGE_NAVBAR,
  CHAT_PAGE_TYPING_AREA,
  USER_PAGE_SEARCH_INPUT,
} from "./domService.js";
import { startUserPage } from "./userPage.js";

export const startChatPage = (user: User) => {
  onChangePage(PAGES.CHAT_PAGE);

  data.CURRENT_USER.state = "chat page";
  window.data.CURRENT_CHAT = user;

  fitHeight(CHAT_PAGE_MESSAGES_AREA, [CHAT_PAGE_NAVBAR, CHAT_PAGE_TYPING_AREA]);

  CHAT_PAGE_BACK_ARROW.removeEventListener("click", () => {
    USER_PAGE_SEARCH_INPUT.value = ""; // <-- create call back function for DRY
    startUserPage();
    window.removeEventListener("storage", (e) => {
      checkIfHasUnreadMsgInCurrentChat(e, user);
    });
  });
  CHAT_PAGE_BACK_ARROW.addEventListener("click", () => {
    USER_PAGE_SEARCH_INPUT.value = "";
    startUserPage();
    window.removeEventListener("storage", (e) => {
      checkIfHasUnreadMsgInCurrentChat(e, user);
    });
  });

  CHAT_PAGE_IMG_INTERLOCUTOR.src = user.photo;
  CHAT_PAGE_NAME_INTERLOCUTOR.innerText = user.login;

  showMessagesOfCurrentChat();

  window.addEventListener("storage", (e) => {
    checkIfHasUnreadMsgInCurrentChat(e, user);
  });
};

export const typingMsg = () => {
  if (CHAT_PAGE_INPUT_MSG.value) {
    CHAT_PAGE_BTN_TO_SEND_MSG.classList.remove("opacity-50");
  } else {
    CHAT_PAGE_BTN_TO_SEND_MSG.classList.add("opacity-50");
  }
};

export const sendMsg = () => {
  // DESCRIPTION:
  // This function run because of event listener of type 'click'
  // added to send button CHAT_PAGE_BTN_TO_SEND_MSG

  if (CHAT_PAGE_INPUT_MSG.value) {
    const from: User = data.CURRENT_USER.user as User;
    const to: User = data.CURRENT_CHAT as User;
    const content = CHAT_PAGE_INPUT_MSG.value;
    const newMsg = new Message({
      content,
      from: from.id,
      to: to.id,
    }); // <-- in the future I have to add array parameter for creating right ID

    const participants = [from.id, to.id];
    const chat = isHaveChat(participants);
    let newChatsArr: Chat[];
    let newUsersArr: User[];
    const newChatsArrJSON = localStorage.getItem("chats");
    const newUsersArrJSON = localStorage.getItem("users");
    if (
      typeof newChatsArrJSON === "string" &&
      typeof newUsersArrJSON === "string"
    ) {
      newChatsArr = JSON.parse(newChatsArrJSON);
      newUsersArr = JSON.parse(newUsersArrJSON);

      if (chat) {
        newChatsArr.forEach((chatToUpdate) => {
          if (chatToUpdate.id === chat.id) chatToUpdate.messages.push(newMsg);
        });
        localStorage.setItem("chats", JSON.stringify(newChatsArr));
      } else {
        const newChat = new Chat({ participants, messages: [newMsg] }); // <-- in the future I have to add array parameter for creating right ID
        // updating local storage:
        newChatsArr.push(newChat);
        localStorage.setItem("chats", JSON.stringify(newChatsArr));
        newUsersArr.forEach((user) => {
          if (user.id === from.id || user.id === to.id)
            user.chats.push(newChat.id);
        });
        localStorage.setItem("users", JSON.stringify(newUsersArr));
        data?.CURRENT_USER?.user?.chats.push(newChat.id);
      }

      CHAT_PAGE_INPUT_MSG.value = "";
      typingMsg();

      const msgElement = createChatMsg(newMsg);
      CHAT_PAGE_MESSAGES_AREA.prepend(msgElement);
    }
  }
};

export const checkIfHasUnreadMsgInCurrentChat = (
  e: StorageEvent,
  interlocutor: User
) => {
  // DESCRIPTION:
  // This function run when change of local storage
  // occurs. If change occurs on local storage key 'chats'
  // this function find opened chat in the storage and
  // send this chat to showUnreadMessages()

  if (e.key === "chats" && data.CURRENT_USER.state === "chat page") {
    const participants = [data?.CURRENT_USER?.user?.id, interlocutor.id];
    const chatsInLocalStorageJSON = localStorage.getItem("chats");
    let chatsInLocalStorage: Chat[];
    if (typeof chatsInLocalStorageJSON === "string") {
      chatsInLocalStorage = JSON.parse(chatsInLocalStorageJSON);

      const findedChat = chatsInLocalStorage.find((chat) => {
        if (haveSameElements(participants, chat.participants)) return true;
        return false;
      });
      if (findedChat) {
        showUnreadMessages(findedChat);
      }
    }
  }
};

export const showUnreadMessages = (findedChat: Chat) => {
  // DESCRIPTION:
  // This function gets chat obj and if there are unread
  // message this func will render it in open chat.
  findedChat.messages.forEach((msg) => {
    if (!msg.hasRead && msg.from !== data?.CURRENT_USER?.user?.id) {
      let chatsFromLocalStorage: Chat[];
      const chatsFromLocalStorageJSON = localStorage.getItem("chats");
      if (typeof chatsFromLocalStorageJSON === "string") {
        chatsFromLocalStorage = JSON.parse(chatsFromLocalStorageJSON);
        chatsFromLocalStorage.forEach((chat) => {
          if (chat.id === findedChat.id) {
            chat.messages.forEach((message) => {
              if (msg.id === message.id) {
                message.hasRead = true;
              }
            });
          }
        });
        localStorage.setItem("chats", JSON.stringify(chatsFromLocalStorage));
        const msgToRender = createChatMsg(msg);
        CHAT_PAGE_MESSAGES_AREA.prepend(msgToRender);
      }
    }
  });
};

export const showMessagesOfCurrentChat = () => {
  // This function runs when user get to chat page.
  // This function remove all message elements from
  // CHAT_PAGE_MESSAGES_AREA and append to it messages
  // of current chat that in the local storage.

  while (CHAT_PAGE_MESSAGES_AREA.hasChildNodes()) {
    CHAT_PAGE_MESSAGES_AREA.removeChild(CHAT_PAGE_MESSAGES_AREA.firstChild!);
  }
  const participants = [data?.CURRENT_USER?.user?.id, data?.CURRENT_CHAT?.id];
  let chatsInLocalStorage: Chat[];
  const chatsInLocalStorageJSON = localStorage.getItem("chats");
  if (typeof chatsInLocalStorageJSON === "string") {
    chatsInLocalStorage = JSON.parse(chatsInLocalStorageJSON);
    const findedChat = chatsInLocalStorage.find((chat) => {
      if (haveSameElements(participants, chat.participants)) return true;
      return false;
    });
    if (findedChat?.messages) {
      findedChat.messages.forEach((msg) => {
        const msgToRender = createChatMsg(msg);
        CHAT_PAGE_MESSAGES_AREA.prepend(msgToRender);
      });
    }

    chatsInLocalStorage.forEach((chat) => {
      if (chat.id === findedChat?.id) {
        chat.messages.forEach((msg) => {
          msg.hasRead = true;
        });
      }
    });
    localStorage.setItem("chats", JSON.stringify(chatsInLocalStorage));
  }
};

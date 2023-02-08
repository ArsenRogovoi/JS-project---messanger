import Chat from "../models/chatModel.js";

export const randNumber = () => {
  return Math.round(Math.random() * 9_000_000 + 1_000_000);
};

export const generateId = (array: Array<any>): number => {
  const random = randNumber();
  if (array.find((item) => item.id === random)) return generateId(array);
  return random;
};

export const fitHeight = (elemToFit: HTMLElement, elemArr: Array<Element>) => {
  let fittedHeight: string = `100vh`;
  elemArr.forEach((elem) => {
    fittedHeight = `${fittedHeight} - ${getComputedStyle(elem).height}`;
  });
  elemToFit.style.height = `calc(${fittedHeight})`;
};

export const isHaveChat = (participantsArr: Array<number>) => {
  const allChatsJSON: string | null = localStorage.getItem("chats");
  let allChats;
  if (typeof allChatsJSON === "string") allChats = JSON.parse(allChatsJSON); //maybe I have to add throwing error when allChats type is null
  const chatToReturn = allChats.find((chat: Chat) => {
    const participants = chat.participants;
    return haveSameElements(participants, participantsArr);
  });
  return chatToReturn;
};

export const haveSameElements = (arr1: Array<any>, arr2: Array<any>) => {
  let flag: boolean = true;
  if (arr1.length === arr2.length) {
    arr1.forEach((elem) => {
      if (!flag) return false;
      return (flag = arr2.includes(elem)); //is return doesn't break the function here?
    });
    return flag;
  } else {
    return false;
  }
};

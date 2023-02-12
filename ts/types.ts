import Message from "./models/messageModel.js";

export interface user {
  userName: string;
  login: string;
  password: string;
  mail: string;
  chats: number[];
  photo: string;
  contacts: number[];
}

export interface chat {
  participants: number[];
  messages: Message[];
}

export interface msg {
  content: string;
  from: number;
  to: number;
}

export interface field {
  fieldHTMLElem: HTMLInputElement;
  errorSpan: HTMLSpanElement;
  validation: {
    minSymbols: number | undefined;
    maxSymbols: number | undefined;
    minNum: number | undefined;
    maxNum: number | undefined;
    regEx: RegExp | undefined;
    isAlreadyExists: "login" | "mail" | undefined;
  };
}

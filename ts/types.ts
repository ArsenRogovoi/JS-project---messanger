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

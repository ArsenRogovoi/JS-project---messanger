import { generateId } from "../utils/algoMethods.js";
import Message from "./messageModel.js";

interface chat {
  participants: number[];
  messages: Message[];
}

class Chat {
  id: number;
  participants: number[];
  messages: Message[];
  constructor(chat: chat, chatArr = [], chatId = generateId(chatArr)) {
    const { participants, messages } = chat;
    this.participants = participants;
    this.messages = messages;
    this.id = chatId;
  }
}

export default Chat;

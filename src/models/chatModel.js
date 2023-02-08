import { generateId } from "../utils/algoMethods.js";
class Chat {
    id;
    participants;
    messages;
    constructor(chat, chatArr = [], chatId = generateId(chatArr)) {
        const { participants, messages } = chat;
        this.participants = participants;
        this.messages = messages;
        this.id = chatId;
    }
}
export default Chat;

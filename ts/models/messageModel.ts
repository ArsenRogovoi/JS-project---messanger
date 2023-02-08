import { generateId } from "../utils/algoMethods.js";

interface msg {
  content: string;
  from: number;
  to: number;
}

class Message {
  id;
  content;
  from;
  to;
  hasRead;
  date;
  constructor(
    msg: msg,
    msgArr = [],
    msgId = generateId(msgArr),
    hasRead = false
  ) {
    const { content, from, to } = msg;
    this.content = content;
    this.from = from;
    this.to = to;
    this.id = msgId;
    this.hasRead = hasRead;
    this.date = new Date();
  }
}

export default Message;
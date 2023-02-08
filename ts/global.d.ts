import User from "./models/userModel.js";

interface data {
  CURRENT_CHAT: User | undefined;
  CURRENT_USER: {
    datesOfLastMessages: Date[];
    state: string;
    user: User | undefined;
  };
}

declare global {
  var data: data;
}

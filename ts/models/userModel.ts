import { generateId } from "../utils/algoMethods.js";

interface user {
  userName: string;
  login: string;
  password: string;
  mail: string;
  chats: number[];
  photo: string;
}

class User {
  id;
  userName;
  login;
  password;
  mail;
  chats;
  photo;

  constructor(user: user, userArr: User[] = [], userId = generateId(userArr)) {
    const { userName, login, password, mail, chats, photo } = user;
    this.userName = userName;
    this.login = login;
    this.password = password;
    this.mail = mail;
    this.chats = chats;
    this.photo = photo;
    this.id = userId;
  }
}

export default User;

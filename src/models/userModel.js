import { generateId } from "../utils/algoMethods.js";
class User {
    id;
    userName;
    login;
    password;
    mail;
    chats;
    photo;
    constructor(user, userArr = [], userId = generateId(userArr)) {
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

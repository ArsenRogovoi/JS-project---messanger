import { generateId } from "../utils/algoMethods.js";
class User {
    id;
    userName;
    login;
    password;
    mail;
    chats;
    photo;
    contacts;
    constructor(user, userArr = [], userId = generateId(userArr)) {
        const { userName, login, password, mail, chats, photo, contacts } = user;
        this.userName = userName;
        this.login = login;
        this.password = password;
        this.mail = mail;
        this.chats = chats;
        this.photo = photo;
        this.id = userId;
        this.contacts = contacts;
    }
}
export default User;

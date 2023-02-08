import User from "../models/userModel.js";
const initialData = () => {
    const users = [
        {
            userName: "Camilla Falconer",
            login: "Camilla",
            password: "4696493",
            mail: "camilla@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/women/2.jpg",
            contacts: [],
        },
        {
            userName: "Anika Sharpe",
            login: "Anika",
            password: "8161165",
            mail: "anika@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/women/3.jpg",
            contacts: [],
        },
        {
            userName: "Jaron Edwards",
            login: "Jaron",
            password: "8239695",
            mail: "jaron@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/men/0.jpg",
            contacts: [],
        },
        {
            userName: "Loida Marley",
            login: "Loida",
            password: "1784412",
            mail: "loida@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/women/4.jpg",
            contacts: [],
        },
        {
            userName: "Vega Bell",
            login: "Vega",
            password: "7077347",
            mail: "vega@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/women/5.jpg",
            contacts: [],
        },
        {
            userName: "Alexia Hoxha",
            login: "Alexia",
            password: "6304364",
            mail: "alexia@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/women/9.jpg",
            contacts: [],
        },
        {
            userName: "Ray Pickle",
            login: "Ray",
            password: "9860876",
            mail: "ray@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/men/3.jpg",
            contacts: [],
        },
        {
            userName: "Jackie Yates",
            login: "Jackie",
            password: "3327313",
            mail: "jackie@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/men/4.jpg",
            contacts: [],
        },
        {
            userName: "Wilbur Weekes",
            login: "Wilbur",
            password: "1782229",
            mail: "wilbur@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/men/7.jpg",
            contacts: [],
        },
        {
            userName: "Andy Banister",
            login: "Andy",
            password: "9557855",
            mail: "andy@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/men/8.jpg",
            contacts: [],
        },
        {
            userName: "Mark Coleman",
            login: "Mark",
            password: "1527839",
            mail: "mark@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/men/9.jpg",
            contacts: [],
        },
        {
            userName: "Linda Harry",
            login: "Linda",
            password: "8481990",
            mail: "linda@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/women/10.jpg",
            contacts: [],
        },
        {
            userName: "Willie Stringer",
            login: "Willie",
            password: "9835764",
            mail: "willie@mail.com",
            chats: [],
            photo: "https://randomuser.me/api/portraits/men/10.jpg",
            contacts: [],
        },
    ];
    const initialUsers = [];
    users.forEach((user, index) => {
        if (index === 0) {
            initialUsers.push(new User(user, initialUsers, 4696493));
        }
        else {
            if (index === 1) {
                initialUsers.push(new User(user, initialUsers, 8161165));
            }
            else {
                if (index === 2) {
                    initialUsers.push(new User(user, initialUsers, 8239695));
                }
                else {
                    initialUsers.push(new User(user, initialUsers));
                }
            }
        }
    });
    const initialChats = [];
    localStorage.setItem("users", JSON.stringify(initialUsers));
    localStorage.setItem("chats", JSON.stringify(initialChats));
};
export default initialData;

import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

interface user {
  userName: string;
  login: string;
  password: string;
  mail: string;
  chats: number[];
  photo: string;
}

const initialData = () => {
  const users: user[] = [
    {
      userName: "Camilla Falconer",
      login: "Camilla",
      password: "4696493",
      mail: "camilla@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      userName: "Anika Sharpe",
      login: "Anika",
      password: "8161165",
      mail: "anika@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      userName: "Jaron Edwards",
      login: "Jaron",
      password: "8239695",
      mail: "jaron@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/men/0.jpg",
    },
    {
      userName: "Loida Marley",
      login: "Loida",
      password: "1784412",
      mail: "loida@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      userName: "Vega Bell",
      login: "Vega",
      password: "7077347",
      mail: "vega@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      userName: "Alexia Hoxha",
      login: "Alexia",
      password: "6304364",
      mail: "alexia@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      userName: "Ray Pickle",
      login: "Ray",
      password: "9860876",
      mail: "ray@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      userName: "Jackie Yates",
      login: "Jackie",
      password: "3327313",
      mail: "jackie@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      userName: "Wilbur Weekes",
      login: "Wilbur",
      password: "1782229",
      mail: "wilbur@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      userName: "Andy Banister",
      login: "Andy",
      password: "9557855",
      mail: "andy@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      userName: "Mark Coleman",
      login: "Mark",
      password: "1527839",
      mail: "mark@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      userName: "Linda Harry",
      login: "Linda",
      password: "8481990",
      mail: "linda@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      userName: "Willie Stringer",
      login: "Willie",
      password: "9835764",
      mail: "willie@mail.com",
      chats: [],
      photo: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  const initialUsers: User[] = [];
  users.forEach((user, index) => {
    if (index === 0) {
      initialUsers.push(new User(user, initialUsers, 4696493));
    } else {
      if (index === 1) {
        initialUsers.push(new User(user, initialUsers, 8161165));
      } else {
        if (index === 2) {
          initialUsers.push(new User(user, initialUsers, 8239695));
        } else {
          initialUsers.push(new User(user, initialUsers));
        }
      }
    }
  });

  const initialChats: Chat[] = [];

  localStorage.setItem("users", JSON.stringify(initialUsers));
  localStorage.setItem("chats", JSON.stringify(initialChats));
};

export default initialData;

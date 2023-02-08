export const randNumber = () => {
    return Math.round(Math.random() * 9_000_000 + 1_000_000);
};
export const generateId = (array) => {
    const random = randNumber();
    if (array.find((item) => item.id === random))
        return generateId(array);
    return random;
};
export const fitHeight = (elemToFit, elemArr) => {
    let fittedHeight = `100vh`;
    elemArr.forEach((elem) => {
        fittedHeight = `${fittedHeight} - ${getComputedStyle(elem).height}`;
    });
    elemToFit.style.height = `calc(${fittedHeight})`;
};
export const isHaveChat = (participantsArr) => {
    const allChatsJSON = localStorage.getItem("chats");
    let allChats;
    if (typeof allChatsJSON === "string")
        allChats = JSON.parse(allChatsJSON);
    const chatToReturn = allChats.find((chat) => {
        const participants = chat.participants;
        return haveSameElements(participants, participantsArr);
    });
    return chatToReturn;
};
export const haveSameElements = (arr1, arr2) => {
    let flag = true;
    if (arr1.length === arr2.length) {
        arr1.forEach((elem) => {
            if (!flag)
                return false;
            return (flag = arr2.includes(elem));
        });
        return flag;
    }
    else {
        return false;
    }
};

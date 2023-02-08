const createChatMsg = (msgObj) => {
    const { content, to } = msgObj;
    const msgContainer = document.createElement("div");
    const msg = document.createElement("p");
    msg.classList.add("m-0", "p-2", "d-inline-block", "border", "rounded-2", "text-black");
    if (to !== data?.CURRENT_USER?.user?.id) {
        msgContainer.classList.add("mt-2", "d-flex", "justify-content-end");
        msg.style.backgroundColor = "#b6b7f8";
    }
    else {
        msgContainer.classList.add("mt-2", "d-flex", "justify-content-start");
        msg.style.backgroundColor = "#afd9f7";
    }
    msg.innerText = content;
    msgContainer.appendChild(msg);
    return msgContainer;
};
export default createChatMsg;

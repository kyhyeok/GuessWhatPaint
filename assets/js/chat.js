import { getSocket } from "./sockets";

const messages = document.querySelector("#jsMessages");
const sendMsg = document.querySelector("#jsSnedMsg");

function appendMsg(text, nickname) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span class="author ${nickname ? "out" : "self"}">${
    nickname ? nickname : "You"
  }:</span> ${text}
    `;
  messages.appendChild(li);
}

function handleSendMsg(event) {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, { message: value });
  input.value = "";
  appendMsg(value);
}

export function handleNewMessage({ message, nickname }) {
  return appendMsg(message, nickname);
}

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

export const disableChat = () => (sendMsg.style.display = "none");

export const enableChat = () => (sendMsg.style.display = "flex");

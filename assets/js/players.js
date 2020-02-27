import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableChat, enableChat } from "./chat";

const board = document.querySelector("#jsPBoard");
const notifs = document.querySelector("#jsNotifs");
const notifsCount = document.querySelector("#jsCount");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNitifs = text => {
  notifsCount.innerText = "";
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);

export const handleGameStarted = () => {
  setNitifs("");
  disableCanvas();
  hideControls();
  enableChat();
};

export const handleLeaderNotify = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are the leader, paint: ${word}`;

  let seconds = 61;
  const decrementSeconds = () => {
    seconds -= 1;
    if (seconds > 0) {
      if (seconds === 1) {
        notifsCount.innerText = `you have ${seconds} second`;
      } else {
        notifsCount.innerText = `you have ${seconds} seconds`;
      }
    } else {
      notifsCount.innerText = "";
    }
  };
  setInterval(decrementSeconds, 1000);
};

export const handleGameEnded = () => {
  setNitifs("Game ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
};

export const handleGameStaring = () => setNitifs("Game is going to start soon");

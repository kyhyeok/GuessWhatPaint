const socket = io("/");

const sendMessage = message => {
  socket.emit("newMessage", {
    message
  });
  console.log(`You: ${message}`);
};

const setNickname = nickname => {
  socket.emit("setNickname", { nickname });
};

const handleMessageNotify = data => {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
};

socket.on("messageNotify", handleMessageNotify);

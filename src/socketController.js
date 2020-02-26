import events from "./events";

const socketController = socket => {
  function broadcast(event, data) {
    return socket.broadcast.emit(event, data);
  }
  socket.on(events.setNickname, ({ nickname }) => {
    broadcast(events.newUser, { nickname });
    socket.nickname = nickname;
  });

  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
  });

  socket.on(events.sendMsg, ({message, nickname}) => {
    broadcast(events.newMsg, { message, nickname: socket.nickname });
  });
};

export default socketController;

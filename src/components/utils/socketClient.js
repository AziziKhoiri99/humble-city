socket.on("joining-room", (userId) => {
  my.id = userId;
});

socket.on("send-message", newText);

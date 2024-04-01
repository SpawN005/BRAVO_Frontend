import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);
    
    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data);
    });
  });
export const socket = io(URL);
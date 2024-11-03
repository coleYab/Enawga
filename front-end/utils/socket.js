import { io } from 'socket.io-client';

let socket;

// create socket for connection
export const initializeSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000'); 
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};


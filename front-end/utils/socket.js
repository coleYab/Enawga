import { io } from 'socket.io-client';

let socket;

// create socket for connection
export const initializeSocket = (currentUserId) => {
  if (!socket) {
    socket = io('http://localhost:5000', {
      query: {
        'userId': currentUserId
      }
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};


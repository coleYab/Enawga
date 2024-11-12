'use client';

import { useState, useEffect, useRef } from 'react';
import { MdSend } from 'react-icons/md';
import { FaCloud } from 'react-icons/fa6';

import ProfileCard from '@components/ProfileCard';
import ChatBubble from '@components/ChatBubble';
import InputCard from '@components/InputCard';

import { initializeSocket, disconnectSocket } from '../utils/socket.js';

const ChatBox = ({ changeBack, clickedUser }) => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [textValue, setTextValue] = useState('');
  const socket = useRef(initializeSocket());

  const handleChange = (e) => {
    setTextValue(e.target.value);
    console.log(textValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // TODO(coleYab): make it interactive
  const sendMessage = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/send/${clickedUser._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message_content: textValue
          }),
        }
      );

      if (!response.ok) {
        console.log("Failed to send new message");
        return;
      }

      setMessages((messages) => [...messages, { message: textValue, session: true }]);
    } catch (error) {
      console.log("Error sending new message: ", error);
    }
    setTextValue();
  };

  // Hook1: connect the user when the component is fully loaded
  useEffect(() => {
    const currentSocket = socket.current;
    
    currentSocket.on('connect', () => {
      console.log('Connected to socket server');
    });
    
    currentSocket.on('newIncomingMessage', (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, message:message.message_content, session: false },
      ]);
      console.log("Reciveing a new message: ", messages);
    });

    return () => {
      setMessages([]);
      if (socket.current) {
        disconnectSocket();
      }
    };
  }, []);

  // Hook2: load the previous chat histroy whenever the clicked user is changed
    useEffect(() => {
    if (clickedUser) {
      // Helper: load all the coversation from the db
      const fetchConverstaion = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/messages/user/${clickedUser._id}`,
            {
              credentials: "include",
            }
          );
  
          if (!response.ok) {
            console.log("Failed to fetch previous messages:", response.status);
            return;
          }
  
          const previousMessages = await response.json();
  
          previousMessages.forEach((message) => {
            message.message = message.message_content,
            message.session = message.receiverId === clickedUser._id;
          });
  
          setMessages(previousMessages);
        } catch (err) {
          console.log("Error while fetching previous messages:", err);
        }
      };

      fetchConverstaion();
    }
  }, [clickedUser]);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  });

  return (
    <div className="right-side justify-between relative">
      {clickedUser ? (
        <div className="flex-column w-full h-full justify-between">
          <div>
            <ProfileCard user={clickedUser} changeBack={changeBack} />
          </div>

          <div className="flex-column overflow-y-auto snap-y snap-mandatory flex-grow">
            <div className="px-4 py-6 flex-column gap-5" ref={chatContainerRef}>
              {messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  message={msg.message}
                  session={msg.session}
                />
              ))}
            </div>
          </div>
          <div className="px-[16px] py-[16px] bg-[var(--box-color-2)] flex-between align-bottom">
            <InputCard
              placeHolder="Text Message"
              inputChange={handleChange}
              inputValue={textValue}
              onKeyDown={handleKeyDown}
            />
            <i onClick={sendMessage}>
              <MdSend size={25} />
            </i>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex-center">
          <div className="flex-column items-center">
            <FaCloud size={100} />
            <h2>No user selected</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

"use client";

import { useState, useEffect, useRef } from "react";
import { MdSend } from "react-icons/md";
import { FaCloud } from "react-icons/fa6";

import ProfileCard from "@components/ProfileCard";
import ChatBubble from "@components/ChatBubble";
import InputCard from "@components/InputCard";

import { initializeSocket, disconnectSocket } from "../utils/socket.js";

const mockUser2 = {
  name: "Filip",
  bio: "I am a software engineer",
  session: false,
};

const ChatBox = ({ changeBack, clickedUser }) => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [textValue, setTextValue] = useState("");
  const socket = useRef(initializeSocket());

  const handleChange = (e) => {
    setTextValue(e.target.value);
    console.log(textValue);
  };

  // make a request and when a the button is clicked
  const sendMessage = () => {
    const message = textValue;
    socket.current.emit("sendMessage", message);
    setMessages((messages) => [...messages, { message, session: true }]);
    setTextValue("");
  };

  useEffect(() => {
    const currentSocket = socket.current;

    currentSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    currentSocket.on("recieveMessage", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, session: false },
      ]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  });

  return (
    <div className="right-side">
      {clickedUser ? (
        <div className="w-full h-full">
          <div>
            <ProfileCard user={clickedUser} changeBack={changeBack} />
          </div>

          <div className="flex-column overflow-y-scroll h-[82%]">
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

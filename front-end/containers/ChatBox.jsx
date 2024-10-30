"use client";
import { useEffect, useRef } from "react";
import { MdSend } from "react-icons/md";

import ProfileCard from "@components/ProfileCard";
import ChatBubble from "@components/ChatBubble";
import InputCard from "@components/InputCard";

const mockUser2 = {
  name: "Filip",
  bio: "I am a software engineer",
  session: false,
};

const ChatBox = ({ changeBack }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  });

  return (
    <div className="right-side">
      <div className="mb-5">
        <ProfileCard user={mockUser2} changeBack={changeBack} />
      </div>

      <div className="flex-column overflow-y-scroll">
        <div className="px-4 py-6 flex-column gap-5" ref={chatContainerRef}>
          <ChatBubble message="Hello" session={true} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={true} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={true} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={false} />
          <ChatBubble message="Hello" session={true} />
          <ChatBubble message="Hello" session={true} />
          <ChatBubble message="Hello" session={true} />
          <ChatBubble message="Hello" session={true} />
        </div>
      </div>
      <div className="px-[16px] py-[16px] bg-[var(--box-color-2)] flex-between">
        <InputCard placeHolder="Text Message" />
        <i>
          <MdSend size={25} />
        </i>
      </div>
    </div>
  );
};

export default ChatBox;

'use client';

import { MdSend } from 'react-icons/md';

import ProfileCard from '@components/ProfileCard';
import ChatBubble from '@components/ChatBubble';
import InputCard from '@components/InputCard';

const mockUser2 = {
  name: 'Filip',
  bio: 'I am a software engineer',
  session: false,
};

const ChatBox = () => {
  return (
    <div className="right-side border-[5px] border-green-200 ">
      <div>
        <ProfileCard user={mockUser2} />
      </div>

      <div className="flex flex-col gap-4 px-3 py-6">
        <ChatBubble message="Hello" session={true} />
        <ChatBubble message="Hi, how are you?" session={false} />
      </div>

      <div className="absolute bottom-0 bg-white">
        <InputCard placeHolder="Text Message" />
      </div>
    </div>
  );
};

export default ChatBox;

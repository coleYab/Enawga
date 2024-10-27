'use client';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import ProfileCard from '@components/ProfileCard';
import InputCard from '@components/InputCard';
import FriendCard from '@components/FriendCard';
import ChatBubble from '@components/ChatBubble';
import { MdSend } from 'react-icons/md';

const mockUser = {
  name: 'Filip',
  bio: 'I am a software engineer',
  time: '2:00 PM',
  session: true,
};

const mockUser2 = {
  name: 'Filip',
  bio: 'I am a software engineer',
  session: false,
};

const HomePage = () => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    document.body.classList.toggle('dark');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="w-screen min-h-screen bg-[var(--background-color)] flex-center">
      <div className="container">
        <div className="left-side">
          <div>
            <ProfileCard
              user={mockUser}
              theme={theme}
              changeTheme={changeTheme}
            />
          </div>

          <div className="bg-[var(--box-color-3)] px-[13px] py-[10px]">
            <div className="bg-[var(--box-color)] rounded-[40px] px-2 flex items-center">
              <i className="text-2xl">
                <IoSearchSharp />
              </i>

              <div className="w-full">
                <InputCard placeHolder="Search here" />
              </div>
            </div>
          </div>

          <div className="chat-list">
            <FriendCard user={mockUser} />
            <hr />
            <FriendCard user={mockUser} />
            <hr />
          </div>
        </div>

        <div className="right-side">
          <div>
            <ProfileCard user={mockUser2} />
          </div>

          <div className="px-3 py-6">
            <ChatBubble message="Hello" session={true} />
            <ChatBubble message="Hi, how are you?" session={false} />
          </div>

          <div className="flex-between px-4 py-3 absolute bottom-0 w-full bg-[var(--box-color-2)]">
            <InputCard placeHolder="Text message" />
            <i>
              <MdSend size={25} />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

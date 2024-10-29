'use client';
import { useState } from 'react';

import FriendList from '@containers/FriendList';
import ChatBox from '@containers/ChatBox';

const HomePage = () => {
  const [theme, setTheme] = useState('dark');
  const [isBack, setIsBack] = useState(true);

  const changeTheme = () => {
    document.body.classList.toggle('light');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="w-screen h-screen  bg-[var(--box-color)] ">
      <div className="hidden lg:flex w-full h-full bg-[var(--box-color)] ">
        <FriendList theme={theme} changeTheme={changeTheme} />
        <ChatBox />
      </div>

      <div className="lg:hidden block w-full h-full relative">
        {!isBack ? (
          <FriendList theme={theme} changeTheme={changeTheme} />
        ) : (
          <ChatBox />
        )}
      </div>
    </div>
  );
};

export default HomePage;

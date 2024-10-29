'use client';

import { IoSearchSharp } from 'react-icons/io5';

import ProfileCard from '@components/ProfileCard';
import InputCard from '@components/InputCard';
import FriendCard from '@components/FriendCard';

const mockUser = {
  name: 'Filip',
  bio: 'I am a software engineer',
  time: '2:00 PM',
  session: true,
};

const FriendList = ({ theme, changeTheme }) => {
  return (
    <div className="left-side">
      <div>
        <ProfileCard user={mockUser} theme={theme} changeTheme={changeTheme} />
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
  );
};

export default FriendList;

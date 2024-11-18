'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import FriendList from '@containers/FriendList';
import ChatBox from '@containers/ChatBox';
import NotificationList from '@containers/NotificationList';
import SideBar from '@containers/SideBar';
import SearchUsers from '@containers/SearchUsers';
import Error from '@containers/ErrorPage';

import { fetchFriends } from '@utils/commonFunctions';

const HomePage = () => {
  const [theme, setTheme] = useState('dark');
  const [isBack, setIsBack] = useState(true);
  const [openNoti, setOpenNoti] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedUser, setClickedUser] = useState(null);
  const [unreadMessageList, setunreadMessageList] = useState([]);

  const router = useRouter();

  const addNewUnreadMessage = (message) => {
    setunreadMessageList((prevUnreadMsg) => [message, ...prevUnreadMsg]);
  };

  // read message
  const removeUnreadMessage = (message) => {
    setunreadMessageList((prevUnreadMsg) =>
      prevUnreadMsg.filter((p) => p?._id !== message?._id),
    );
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/verify?timestamp=${new Date().getTime()}`, // To prevent caching.
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          const data = response.data;
          setCurrentUser(data.user);
          setLoading(false);
        } else {
          setCurrentUser(null);
          setLoading(false);
        }
      } catch (error) {
        setCurrentUser(null);
        setLoading(false);
        console.error("Error while verifying token: ", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchFriends(setFriends);
  }, []);

  const handleMessageClick = async (message) => {
    const toClickUserId = message?.senderId;

    for (const friend of friends) {
      if (toClickUserId === friend?._id) {
        setClickedUser(friend);
      }
    }
    removeUnreadMessage(message);
    handleNotification();
  };

  const changeTheme = () => {
    document.body.classList.toggle('light');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const changeBack = () => {
    setIsBack((prev) => !prev);
  };

  const handleNotification = () => {
    setOpenNoti((prev) => !prev);
  };

  const handleClickedUser = (user) => {
    setClickedUser(user);
  };

  const handleError = () => {
    router.push('/');
  };

  return (
    <>
      {loading ? (
        <div className="loading-body">
          <div className="loading-spinner" />
        </div>
      ) : !currentUser ? (
        <>
          <Error message="User data not found." handleError={handleError} />
        </>
      ) : (
        <div className="w-screen h-screen bg-[var(--box-color)] flex justify-center">
          <SideBar currentUser={currentUser} />
          <SearchUsers setFriends={setFriends} />

          {openNoti && (
            <NotificationList
              messageList={unreadMessageList}
              handleMessageClick={handleMessageClick}
              handleNotification={handleNotification}
            />
          )}

          <div className="hidden lg:flex w-screen h-screen bg-[var(--box-color)] z-0">
            <FriendList
              friends={friends}
              theme={theme}
              handleClickedUser={handleClickedUser}
              changeTheme={changeTheme}
              handleNotification={handleNotification}
              currentUser={currentUser}
            />
            <ChatBox
              currentUser={currentUser}
              unreadMessagesHandler={addNewUnreadMessage}
              clickedUser={clickedUser}
            />
          </div>

          <div className="lg:hidden block w-full h-full relative">
            {isBack ? (
              <FriendList
                friends={friends}
                theme={theme}
                handleClickedUser={handleClickedUser}
                changeTheme={changeTheme}
                handleNotification={handleNotification}
                currentUser={currentUser}
                changeBack={changeBack}
              />
            ) : (
              <ChatBox
                changeBack={changeBack}
                currentUser={currentUser}
                unreadMessagesHandler={addNewUnreadMessage}
                clickedUser={clickedUser}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;

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
    setunreadMessageList((prevUnreadMsg) => [message, ...prevUnreadMsg])
  }

  // read message
  const removeUnreadMessage = (message) => {
    setunreadMessageList((prevUnreadMsg) => prevUnreadMsg.filter((p) => p?._id !== message?._id))
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/verify?timestamp=${new Date().getTime()}`, // To prevent caching.
          {
            withCredentials: true,
          },
        );
        console.log(response.status);
        if (response.status === 200) {
          const data = response.data;
          console.log('Home Data: ', data.user);
          setCurrentUser(data.user);
          setLoading(false);
        } else {
          console.log('No user data found');
          setCurrentUser(null);
          setLoading(false);
        }
      } catch (error) {
        setCurrentUser(null);
        setLoading(false);
        console.log(error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          credentials: 'include',
        });

        if (!response.ok) {
          console.log('Failed to fetch friends');
          return;
        }

        const data = await response.json();

        if (data) {
          console.log('Friends: ', data);
          setFriends(data);
        }
      } catch (error) {
        console.log('Error fetching friends: ', error);
      }
    };

    fetchFriends();
  }, []);


  const handleMessageClick = async(message) => {
    const toClickUserId = message?.senderId;

    for (const friend of friends) {
      if (toClickUserId === friend?._id) {
        setClickedUser(friend);
      }
    }
    removeUnreadMessage(message);
    handleNotification();
  }

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
    console.log('Clicked User: ', user);
    setClickedUser(user);
    console.log('Set Clicked User: ', clickedUser);
  };

  return (
    <>
      {loading ? (
        <div className="loading-body">
          <div className="loading-spinner" />
        </div>
      ) : !currentUser ? (
        <>
          <Error message="User data not found." />
          <p className="text-black">
            Try Logging in. <a href="/login">Login</a>
          </p>
        </>
      ) : (
        <div className="w-screen h-screen bg-[var(--box-color)] flex justify-center">
          <SideBar currentUser={currentUser} />
          <SearchUsers />

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
            {!isBack ? (
              <FriendList
                friends={friends}
                theme={theme}
                handleClickedUser={handleClickedUser}
                changeTheme={changeTheme}
                handleNotification={handleNotification}
                currentUser={currentUser}
              />
            ) : (
              <ChatBox changeBack={changeBack} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FriendList from "@containers/FriendList";
import ChatBox from "@containers/ChatBox";
import NotificationList from "@containers/NotificationList";
import SideBar from "@containers/SideBar";
import ProfileContainer from "@containers/ProfileContainer";

const mockUsers = [
  {
    name: "Filip",
    bio: "I am a software engineer",
    time: "2:00 PM",
    session: true,
  },
  {
    name: "Jonah",
    bio: "Don't focus under the sun",
    time: "3:21 AM",
    session: true,
  },
  {
    name: "Dagi",
    bio: "A Proud lua developer",
    time: "6:41 AM",
    session: true,
  },

  {
    name: "Levon",
    bio: "Tried to be a chess champion",
    time: "1:25 PM",
    session: true,
  },
  {
    name: "Terminator",
    bio: "With the necessary effort everything is possible.",
    time: "3:21 AM",
    session: true,
  },
];

const messageList = [
  {
    message: "Hello",
    username: "Daniel",
    time: "2:40AM",
    session: false,
  },
  {
    message: "Hello",
    username: "Nati",
    time: "3:00PM",
    session: false,
  },
  {
    message: "How was the program?",
    username: "Nati",
    time: "3:02PM",
    session: false,
  },
  {
    message: "Which one are you asking?",
    username: "Daniel",
    time: "3:07PM",
    session: false,
  },
];

const HomePage = () => {
  const [theme, setTheme] = useState("dark");
  const [isBack, setIsBack] = useState(true);
  const [openNoti, setOpenNoti] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const router = useRouter();

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     const response = await fetch("http://localhost:3000/api/auth/verify", {
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       router.push("/login");
  //     }

  //     const data = await response.json();
  //     setCurrentUser(data.user);
  //   };

  //   fetchCurrentUser();
  // }, []);

  const changeTheme = () => {
    document.body.classList.toggle("light");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const changeBack = () => {
    setIsBack((prev) => !prev);
  };

  const handleNotification = () => {
    setOpenNoti((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen bg-[var(--box-color)] flex justify-center">
      <SideBar user={mockUsers[0]} />
      <ProfileContainer user={mockUsers[0]} />

      {openNoti && (
        <NotificationList
          messageList={messageList}
          handleNotification={handleNotification}
        />
      )}

      <div className="hidden lg:flex w-screen h-screen bg-[var(--box-color)] z-0">
        <FriendList
          users={mockUsers}
          theme={theme}
          changeTheme={changeTheme}
          handleNotification={handleNotification}
          currentUser={currentUser}
        />
        <ChatBox />
      </div>

      <div className="lg:hidden block w-full h-full relative">
        {!isBack ? (
          <FriendList theme={theme} changeTheme={changeTheme} />
        ) : (
          <ChatBox changeBack={changeBack} />
        )}
      </div>
    </div>
  );
};

export default HomePage;

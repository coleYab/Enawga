"use client";

import { IoSearchSharp } from "react-icons/io5";

import ProfileCard from "@components/ProfileCard";
import InputCard from "@components/InputCard";
import FriendCard from "@components/FriendCard";

const FriendList = ({
  users,
  theme,
  changeTheme,
  handleNotification,
  currentUser,
}) => {
  return (
    <div className="left-side">
      <div>
        <ProfileCard
          user={users[0]}
          theme={theme}
          changeTheme={changeTheme}
          handleNotification={handleNotification}
          currentUser={currentUser}
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

      <div className="h-full overflow-y-auto">
        {users.map((user, index) => (
          <div
            key={index}
            onClick={() => {
              document
                .getElementById("profile_container")
                .classList.replace("hidden", "fixed");
            }}
          >
            <FriendCard user={user} />
            <hr />
          </div>
        ))}
        {/* <div
          onClick={() => {
            document
              .getElementById("profile_container")
              .classList.replace("hidden", "fixed");
          }}
        >
          <FriendCard user={user} />
          <hr />
        </div> */}
      </div>
    </div>
  );
};

export default FriendList;

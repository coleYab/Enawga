"use client";

import { IoSearchSharp } from "react-icons/io5";

import ProfileCard from "@components/ProfileCard";
import InputCard from "@components/InputCard";
import FriendCard from "@components/FriendCard";

const FriendList = ({
  friends,
  theme,
  changeTheme,
  handleNotification,
  currentUser,
}) => {
  return (
    <div className="left-side">
      <div>
        <ProfileCard
          theme={theme}
          changeTheme={changeTheme}
          handleNotification={handleNotification}
          currentUser={currentUser}
        />
      </div>

      <div className="bg-[var(--box-color-3)] px-[13px] py-[10px] flex-center">
        <button
          onClick={() => {
            document
              .getElementById("search_container")
              .classList.replace("hidden", "fixed");
          }}
          className="w-full py-1 bg-[var(--box-color)] border border-transparent flex-center gap-2 hover:bg-[var(--box-color-2)] hover:border-[var(--box-color)] rounded-sm"
        >
          <IoSearchSharp />
          <p>Find new friends</p>
        </button>
      </div>

      <div className="h-full overflow-y-auto">
        {friends &&
          friends.map((friend, index) => (
            <div key={index}>
              <FriendCard user={friend} />
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

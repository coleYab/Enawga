"use client";

import { IoSearchSharp } from "react-icons/io5";
import { FaUserSlash } from "react-icons/fa6";

import ProfileCard from "@components/ProfileCard";
import FriendCard from "@components/FriendCard";

const FriendList = ({
  friends,
  theme,
  handleClickedUser,
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
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <div key={index} onClick={() => handleClickedUser(friend)}>
              <FriendCard user={friend} />
              <hr />
            </div>
          ))
        ) : (
          <div className="h-full flex-center">
            <div className="flex-column items-center">
              <FaUserSlash size={100} />
              <h2>No Friends found</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendList;

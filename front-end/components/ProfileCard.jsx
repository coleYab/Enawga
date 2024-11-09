import Image from "next/image";

import { IoIosSunny } from "react-icons/io";
import { MdNightsStay } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

import { trim } from "@utils/commonFunctions";
import DefaultProfile from "@public/assets/default-profile-image.jpg";

const ProfileCard = ({
  user,
  theme,
  changeTheme,
  changeBack,
  handleNotification,
  currentUser,
}) => {
  return (
    <div className="flex-between py-4 px-3 bg-[var(--box-color-2)]">
      <div className="flex items-center gap-3 max-w-[500px]">
        <div className="lg:hidden">
          {!currentUser && (
            <i>
              <IoArrowBack size={25} onClick={changeBack} />
            </i>
          )}
        </div>
        <div>
          <Image
            src={
              currentUser?.profilePic
                ? `${currentUser.profilePic}`
                : user?.profilePic
                ? `${user.profilePic}`
                : DefaultProfile
            }
            alt="profile image"
            width={50}
            height={50}
            className={`profile-image ${
              currentUser ? "peer hover:cursor-pointer" : ""
            }`}
            onClick={() => {
              if (currentUser) {
                document
                  .getElementById("sidebar")
                  .classList.replace("-left-[100%]", "left-0");
              }
            }}
          />
        </div>

        {!currentUser && (
          <div className="flex-col">
            <h2 className="font-semibold text-sm lg:text-lg">
              {user.fullName}
              <span className="ml-2 text-[var(--text-color-muted)] font-normal">
                ({user.username})
              </span>
            </h2>
            <p className="text-[var(--text-color-muted)] leading-5">
              {user.bio.length > 0 ? trim(user.bio) : "No bio found"}
            </p>
          </div>
        )}
      </div>

      <div className="flex-between w-20">
        {currentUser && (
          <i className="relative" onClick={handleNotification}>
            <IoIosNotificationsOutline size={25} />
            <div className="bg-[var(--bubble-color)] w-2 h-2 rounded-full absolute top-[3px] right-[5px]"></div>
          </i>
        )}

        {currentUser && (
          <div>
            {theme === "dark" ? (
              <i onClick={changeTheme}>
                <IoIosSunny size={25} />
              </i>
            ) : (
              <i onClick={changeTheme}>
                <MdNightsStay size={25} />
              </i>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;

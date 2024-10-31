import Image from "next/image";

import { IoArrowBack } from "react-icons/io5";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { MdBlockFlipped } from "react-icons/md";

const ProfileContainer = ({ user }) => {
  return (
    <div
      id="profile_container"
      className="z-10 hidden h-screen w-screen flex-center bg-[#12121291]"
    >
      <div className="bg-[var(--box-color-2)] w-[35%] h-[70%] rounded-lg">
        <div className="px-4 py-4">
          <i
            onClick={() => {
              document
                .getElementById("profile_container")
                .classList.replace("fixed", "hidden");
            }}
          >
            <IoArrowBack size={25} />
          </i>
        </div>

        <div className="flex-column gap-3 px-4 py-4">
          <div className="flex gap-6 items-start">
            <Image
              src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg"
              alt="profile image"
              width={50}
              height={50}
              className="profile-image"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">{user.name}</h1>

              <h3 className="text-lg text-[var(--text-color-muted)]">
                {user.bio}
              </h3>
            </div>
          </div>

          <div className="mt-6 w-full flex justify-end gap-3">
            <button className="flex items-center gap-2 px-3 py-1 bg-[#1a70aa] hover:bg-[#3b88bb] hover:cursor-pointer rounded-sm">
              <MdOutlineSpeakerNotes size={16} />
              <div className="text-semibold">Message</div>
            </button>

            <button className="flex items-center gap-2 px-3 py-1 bg-[#e64f44] hover:bg-[#ee685f] hover:cursor-pointer rounded-sm">
              <MdBlockFlipped size={16} />
              <div className="text-semibold">Block</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;

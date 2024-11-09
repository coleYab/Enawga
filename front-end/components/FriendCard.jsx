import Image from "next/image";

import { formatTime } from "@utils/commonFunctions";
import DefaultProfile from "@public/assets/default-profile-image.jpg";

const FriendCard = ({ user }) => {
  return (
    <div className="friend-drawer friend-drawer--hover">
      <div className="flex gap-3">
        <div className="w-[50px] h-[50px]">
          <Image
            src={user.profilePic ? `${user.profilePic}` : DefaultProfile}
            alt="user image"
            width={50}
            height={50}
            className="profile-image"
          />
        </div>

        <div>
          <h2 className="font-semibold">{user.username}</h2>
          <p className="text-[var(--text-color-muted)]">{user.bio}</p>
        </div>
      </div>

      <div className="text-[var(--text-color-muted)] text-sm font-light">
        {formatTime(user.updatedAt)}
      </div>
    </div>
  );
};

export default FriendCard;

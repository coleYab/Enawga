import Image from "next/image";

const FriendCard = ({ user }) => {
  return (
    <div className="friend-drawer friend-drawer--hover">
      <div className="flex gap-3">
        <div className="w-[50px] h-[50px]">
          <Image
            src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg"
            alt="user image"
            width={50}
            height={50}
            className="profile-image"
          />
        </div>

        <div>
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-[var(--text-color-muted)]">{user.bio}</p>
        </div>
      </div>

      <div className="text-[var(--text-color-muted)] text-sm font-light">
        {user.time}
      </div>
    </div>
  );
};

export default FriendCard;

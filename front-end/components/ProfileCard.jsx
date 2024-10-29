import Image from 'next/image';

import { IoIosSunny } from 'react-icons/io';
import { MdNightsStay } from 'react-icons/md';
import { IoReload } from 'react-icons/io5';

const ProfileCard = ({ user, theme, changeTheme }) => {
  return (
    <div className="flex-between py-4 px-3 bg-[var(--box-color-2)] rounded-lg">
      <div className="flex items-center gap-3 max-w-[500px]">
        <div>
          <Image
            src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg"
            alt="profile image"
            width={50}
            height={50}
            className="profile-image"
          />
        </div>

        {!user.session && (
          <div className="flex-col">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-[var(--text-color-muted)]">{user.bio}</p>
          </div>
        )}
      </div>

      <div className="flex-between w-20">
        <i>
          <IoReload size={25} />
        </i>

        {user.session && (
          <div>
            {theme === 'dark' ? (
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

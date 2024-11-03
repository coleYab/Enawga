'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IoArrowBack } from 'react-icons/io5';
import { GiExitDoor } from 'react-icons/gi';

const SideBar = ({ user }) => {
  const [bio, setBio] = useState(user.bio);
  const [debounceBio, setDebounceBio] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setDebounceBio(bio);
  //   }, 300);
  //   return () => clearTimeout(timerId);
  // }, [bio]);

  // // Updates user bio on a given interval.
  // useEffect(() => {
  //   const updateBio = async () => {
  //     // if (debounceBio.trim() === '') {
  //     //   setDebounceBio([]);
  //     //   return;
  //     // }

  //     try {
  //       const response = await fetch('http://localhost:5000/api/users', {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ bio }),
  //       });

  //       const data = await response.json();

  //       if (response.ok && data) {
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       console.error('Error updating bio:', error);
  //     }
  //   };

  //   updateBio();
  // }, [debounceBio]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        console.log('Logout Failed!');
        return;
      }
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="sidebar"
      className="z-20 fixed h-full lg:w-[25%] w-full bg-[var(--box-color)] flex-column rounded-lg top-0 -left-[100%] shadow-2xl peer-focus:transition ease-out delay-150 duration-400"
    >
      <div className="flex-between px-4 py-4 bg-[var(--box-color-2)] rounded-lg">
        <i
          onClick={() => {
            document
              .getElementById('sidebar')
              .classList.replace('left-0', '-left-[100%]');
          }}
        >
          <IoArrowBack size={25} />
        </i>

        <Image
          src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg"
          alt="profile image"
          width={50}
          height={50}
          className="profile-image"
        />
      </div>

      <div className="flex-column gap-5 px-4 py-4">
        <h2 className="font-bold text-xl lg:text-2xl w-full ml-[1rem]">
          {user.name}
        </h2>

        <div>
          <textarea
            cols="30"
            rows="5"
            value={bio}
            // onChange={(e) => setBio((prev) => e.target.value)}
            onChange={(e) => setBio(e.target.value)}
            className="text-[1.15rem] w-full max-h-[300px] px-5 py-3 border-0 rounded-[30px] text-wrap text-[var(--text-color)] bg-[var(--box-color-2)] focus:outline-none transition-colors"
          ></textarea>
        </div>
      </div>

      <div
        className="w-full h-full flex justify-end items-end px-5 py-4"
        onClick={handleLogout}
      >
        <i className="flex gap-2">
          <GiExitDoor size={25} />
          <div className="text-semibold text-lg tracking-tight hover:tracking-wide">
            Logout
          </div>
        </i>
      </div>
    </div>
  );
};

export default SideBar;

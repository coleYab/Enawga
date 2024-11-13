'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IoArrowBack } from 'react-icons/io5';
import { GiExitDoor } from 'react-icons/gi';

import { sleep } from '@utils/commonFunctions';
import DefaultProfile from '@public/assets/default-profile-image.jpg';

const SideBar = ({ currentUser }) => {
  const [bio, setBio] = useState(currentUser.bio);
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

      sleep(500);
      document.getElementById('loading-body').classList.add('loading-body');
      document
        .getElementById('loading-spinner')
        .classList.add('loading-spinner');
      router.push('/');
      sleep(500);
      document.getElementById('loading-body').classList.remove('loading-body');
      document
        .getElementById('loading-spinner')
        .classList.remove('loading-spinner');
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
          src={
            currentUser?.profilePic
              ? `${currentUser.profilePic}`
              : DefaultProfile
          }
          alt="profile image"
          width={50}
          height={50}
          className="profile-image"
        />
      </div>

      <div className="flex-col h-screen gap-8 px-4 py-4">
        <div className="bg-gray-500 flex flex-column gap-2 p-5 rounded-lg min-w-fit max-w-[70%]">
          <h2 className="font-bold text-2xl lg:text-2xl w-full ml-[1rem]">
            <span className="text-2xl text-blue-300">Name: </span>
            {currentUser.fullName}
          </h2>
          <h2 className="font-bold text-2xl lg:text-2xl w-full ml-[1rem]">
            <span className="text-2xl text-blue-300">Username:</span>{' '}
            {currentUser.username}
          </h2>
          {currentUser.bio && (
            <h2 className="font-bold text-2xl lg:text-2xl w-full ml-[1rem]">
              <span className="text-2xl text-blue-300">Bio:</span>{' '}
              {currentUser.bio}
            </h2>
          )}
        </div>
        <button
          className="text-2xl py-3 px-6 bg-blue-500 my-4 rounded-lg hover:bg-blue-400"
          onClick={() => router.push('/edit-profile')}
        >
          Edit Profile
        </button>
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

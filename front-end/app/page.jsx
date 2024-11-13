'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen p-8 flex-column root-page">
      <div className="w-full h-[75%] flex-column justify-center items-center">
        <h1 className="uppercase max-w-[75%] text-center font-extrabold tracking-wider text-wrap text-4xl lg:text-6xl bg-gradient-to-r from-blue-500 to-blue-200 bg-clip-text text-transparent">
          Welcome to Enawga Web Chat App
        </h1>
        <h2 className="mt-7 text-2xl lg:text-3xl">
          Connect with others in real-time. Join chat rooms, share moments, and
          stay engaged.
        </h2>
        <div className="h-[70px] mt-6">
          <button
            className="animated-button"
            onClick={() => {
              router.push('/login');
            }}
          ></button>
        </div>
      </div>

      <div className="flex justify-center items-end gap-8">
        <div
          onClick={() => {
            router.push('https://github.com/DanielJohn17');
          }}
          className="w-[300px] flex items-center gap-5 px-4 py-2 rounded-lg shadow-lg shadow-blue-400 border border-green-300 hover:shadow-none hover:cursor-pointer"
        >
          <div>
            <Image
              className="profile-image"
              src="https://avatars.githubusercontent.com/u/112425917?v=4"
              alt="github profile image"
              width={50}
              height={50}
            />
          </div>

          <div>
            <h2 className="text-xl">DanielJohn17</h2>
            <p>Daniel Yohannes</p>
          </div>
        </div>

        <div
          onClick={() => {
            router.push('https://github.com/nathanaelcheramlak');
          }}
          className="w-[300px] flex items-center gap-5 px-4 py-2 rounded-lg shadow-lg shadow-purple-400 border border-red-300 hover:shadow-none hover:cursor-pointer"
        >
          <div>
            <Image
              className="profile-image"
              src="https://avatars.githubusercontent.com/u/124700160?v=4"
              alt="github profile image"
              width={50}
              height={50}
            />
          </div>

          <div>
            <h2 className="text-xl">nathnaelcheramlak</h2>
            <p>Nathanael Cheramlak</p>
          </div>
        </div>

        <div
          onClick={() => {
            router.push('https://github.com/coleYab');
          }}
          className="w-[300px] flex items-center gap-5 px-4 py-2 rounded-lg shadow-lg shadow-green-400 border border-lime-300 hover:shadow-none hover:cursor-pointer"
        >
          <div>
            <Image
              className="profile-image"
              src="https://avatars.githubusercontent.com/u/142606658?v=4"
              alt="github profile image"
              width={50}
              height={50}
            />
          </div>

          <div>
            <h2 className="text-xl">coleYab </h2>
            <p className="font-light">Yeabsira Moges</p>
          </div>
        </div>
      </div>
    </div>
  );
}

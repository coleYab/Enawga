import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { IoSearchSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaUserSlash } from "react-icons/fa6";

import { sleep } from "@utils/commonFunctions";
import DefaultProfile from "@public/assets/default-profile-image.jpg";

const SearchUsers = ({}) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/search/user/${search}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.log("Failed to fetch users");
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    };

    if (search.length > 0) {
      fetchUsers();
    }
  }, [search]);

  const handleMessageClick = async (user) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/send/${user._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message_content: "Hello",
          }),
        }
      );

      if (!response.ok) {
        console.log("Failed to send new message");
        return;
      }
      setSearch("");

      document
        .getElementById("search_container")
        .classList.replace("fixed", "hidden");
      router.reload();
    } catch (error) {
      console.log("Error sending new message: ", error);
    }
  };

  return (
    <div
      id="search_container"
      className="hidden w-full h-full flex-center bg-black bg-opacity-60 z-20 fixed top-0 left-0"
    >
      <div className="w-[85%] h-[85%] rounded-lg bg-[var(--box-color-2)]">
        <div className="input-container">
          <div className="h-full align-top py-2 mr-3">
            <button
              className="p-1 rounded-full hover:bg-[var(--box-color-2)]"
              onClick={() => {
                document
                  .getElementById("search_container")
                  .classList.replace("fixed", "hidden");
              }}
            >
              <IoArrowBack size={25} />
            </button>
          </div>

          <div className="w-full flex gap-2 items-center">
            <IoSearchSharp size={25} />
            <input
              type="text"
              placeholder="Search Users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {search.length > 0 ? (
          <ul className="h-[650px] bg-[var(--box-color-3)] overflow-y-auto">
            {users &&
              users.map((user, index) => (
                <div key={index} className="hover:bg-[var(--box-color)]">
                  <li className="py-3 px-6 flex-between">
                    <div className="flex">
                      <div className="w-[50px] h-[50px] mr-4">
                        <Image
                          src={
                            user.profilePic
                              ? `${user.profilePic}`
                              : DefaultProfile
                          }
                          alt="profile image"
                          width={50}
                          height={50}
                          className="profile-image"
                        />
                      </div>

                      <div>
                        <h2 className="font-semibold text-sm lg:text-lg">
                          {user.username}
                        </h2>
                        <p className="text-[var(--text-color-muted)] leading-5">
                          {user.fullName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleMessageClick(user)}
                      className="mr-14 p-1 rounded-md hover:bg-[var(--hover-color)]"
                    >
                      <MdOutlineMessage size={25} />
                    </button>
                  </li>
                  <hr />
                </div>
              ))}
          </ul>
        ) : (
          <div className="h-full flex-center items-center">
            {search.length > 0 ? (
              <div>
                <FaUserSlash size={100} />
                <h2>No users found</h2>
              </div>
            ) : (
              <div>
                <IoSearchSharp size={100} />
                <h2>Search for users</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;

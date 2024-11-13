'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const [info, setInfo] = useState({
    fullName: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  // Handler to update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/verify?timestamp=${new Date().getTime()}`, // Prevent caching.
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          const data = response.data;
          setInfo(data.user);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!info.fullName) newErrors.fullName = 'Full name is required';
    if (!info.bio) newErrors.bio = 'Bio is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(info);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: info.fullName,
          bio: info.bio,
        }),
        credentials: 'include',
      });

      console.log(response.status); // Log status code for debugging
      if (!response.ok) {
        const errorText = await response.text(); // Capture error message
        console.error('Error:', errorText);
        throw new Error('EditProfile failed. Something went wrong.');
      }

      const data = await response.json();
      console.log('Edit Profile successful:', data);
      router.push('/home');
    } catch (error) {
      console.error('Error during submit:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return pageLoading ? (
    <h1>Loading</h1>
  ) : (
    <div className="flex gap-4 flex-col w-full justify-center items-center h-screen bg-[var(--box-color)]">
      <div className="min-w-[300px] w-auto h-auto flex flex-col items-center gap-4 p-8 shadow-2xl rounded-lg">
        <h1 className="font-bold tracking-wider text-xl lg:text-3xl">
          Edit Profile
        </h1>

        {/* Full Name Input */}
        <label className="flex flex-col w-full">
          <input
            type="text"
            name="fullName"
            className="login-input-card"
            placeholder="Enter Full Name"
            value={info.fullName || ''}
            onChange={handleChange}
          />
          {errors.fullName && (
            <span className="text-sm text-red-500">{errors.fullName}</span>
          )}
        </label>

        {/* Bio Input */}
        <label className="flex flex-col w-full">
          <input
            type="text"
            name="bio"
            className="login-input-card"
            placeholder="Enter Bio"
            value={info.bio || ''}
            onChange={handleChange}
          />
          {errors.bio && (
            <span className="text-sm text-red-500">{errors.bio}</span>
          )}
        </label>

        {/* Loading Indicator and Submit Button */}
        <button
          onClick={handleSubmit}
          className={`px-8 py-2 rounded-sm ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#02698b] hover:bg-[#117da1]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [info, setInfo] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  // Handler to update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};
    if (!info.fullName) newErrors.fullName = 'Full Name is required';
    if (!info.email) newErrors.email = 'Email is required';
    if (!info.username) newErrors.username = 'Username is required';
    if (!info.password) newErrors.password = 'Password is required';
    if (info.password !== info.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: info.fullName,
          username: info.username,
          email: info.email,
          password: info.password,
          confirmPassword: info.confirmPassword,
        }),
        credentials: 'include',
      });
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Signup failed. Something went wrong.');
      }
      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        router.push('/');
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-4 flex-col w-full justify-center items-center h-screen bg-[var(--box-color)]">
      <div className="min-w-[300px] w-auto h-auto flex-column items-center gap-4 p-8 shadow-2xl rounded-lg">
        <h1 className="font-bold tracking-wider text-xl lg:text-3xl">Signup</h1>

        {/* Full Name Input */}
        <label className="flex flex-col w-full">
          <input
            type="text"
            name="fullName"
            className="login-input-card"
            placeholder="Full Name"
            value={info.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <span className="text-sm text-red-500">{errors.fullName}</span>
          )}
        </label>

        {/* Email Input */}
        <label className="flex flex-col w-full">
          <input
            type="email"
            name="email"
            className="login-input-card"
            placeholder="Email"
            value={info.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </label>

        {/* Username Input */}
        <label className="flex flex-col w-full">
          <input
            type="text"
            name="username"
            className="login-input-card"
            placeholder="Username"
            value={info.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className="text-sm text-red-500">{errors.username}</span>
          )}
        </label>

        {/* Password Input */}
        <label className="flex flex-col w-full">
          <input
            type="password"
            name="password"
            className="login-input-card"
            placeholder="Password"
            value={info.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </label>

        {/* Confirm Password Input */}
        <label className="flex flex-col w-full">
          <input
            type="password"
            name="confirmPassword"
            className="login-input-card"
            placeholder="Confirm Password"
            value={info.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword}
            </span>
          )}
        </label>

        <div className="text-xs font-light self-start ml-10 -mt-3">
          Already have an account?{' '}
          <a className="underline text-xs" href="/login">
            Login
          </a>
        </div>

        {/* Loading Indicator and Submit Button */}
        {isLoading ? (
          <button className="px-8 py-2 bg-[#02698b] hover:bg-[#117da1] rounded-sm">
            Signing Up ...
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-[#02698b] hover:bg-[#117da1] rounded-sm"
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Signup;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    // Input validation
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/login?rememberMe=${rememberMe}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      router.push("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 flex-col w-full justify-center items-center h-screen bg-[var(--box-color)]">
      <div className="min-w-[300px] w-auto h-auto flex-column items-center gap-4 p-8 shadow-2xl rounded-lg">
        <h1 className="font-bold tracking-wider text-xl lg:text-3xl">Login</h1>

        {/* Username Input */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="login-input-card"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        {/* Password Input */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="login-input-card"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-4 w-48 h-auto">
          {/* <label className="label cursor-pointer"> */}
          <span className="label-text">Remember me</span>
          <input
            type="checkbox"
            checked={rememberMe}
            className="checkbox checkbox-primary"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          {/* </label> */}
        </div>

        <div className="text-xs font-light self-start ml-10 -mt-3">
          Dont have an account?{" "}
          <a className="underline text-xs" href="/signup">
            Sign up
          </a>
        </div>

        <div className="w-full h-auto relative">
          <hr className="w-full my-2 text-[var(--text-color)]" />
          <div className="bg-[var(--box-color)] px-2 py-1 absolute -top-[8px] left-[45%]">
            or
          </div>

          <div className="w-full flex justify-center my-4">
            <button className="px-3 py-1 bg-[var(--box-color-2)] rounded-sm hover:bg-[var(--hover-color)] flex items-center gap-3">
              <FcGoogle size={25} />
              <div>Sign in with Google</div>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Login Button */}
        <button
          className="px-8 py-2 bg-[var(--box-color-2)] hover:bg-[var(--hover-color)] rounded-sm"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;

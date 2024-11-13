import React from "react";

const Error = ({ message, handleError }) => {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-gradient-to-r from-[#121212] to-[#303030]">
      <div className="flex-column items-center gap-9">
        <h1 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent text-3xl lg:text-5xl">
          Error! {message}{" "}
        </h1>
        <button
          className="px-4 py-1 text-xl tracking-wide rounded-sm bg-blue-600 hover:bg-blue-700"
          onClick={handleError}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Error;

import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <h1 className="text-[red] text-5xl">Error! {message} </h1>
    </div>
  );
};

export default Error;

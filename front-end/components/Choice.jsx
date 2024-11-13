const Choice = ({ message, ...props }) => {
  return (
    <div
      id="choice-component"
      className="hidden absolute left-0 top-0 w-full h-full z-20 bg-black bg-opacity-60 flex-center"
    >
      <div className="w-[450px] px-5 py-10 bg-[var(--box-color)] flex-column gap-7">
        <div className="w-full flex-center text-wrap text-center">
          {message}
        </div>
        <div className="w-full px-32 flex-between ">
          <button
            onClick={props.onNo}
            className="px-4 py-1 bg-red-400 hover:bg-red-500 rounded-sm cursor-pointer"
          >
            No
          </button>
          <button
            className="px-4 py-1 bg-blue-400 hover:bg-blue-500 rounded-sm cursor-pointer"
            onClick={props.onYes}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Choice;

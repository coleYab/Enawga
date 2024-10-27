const InputCard = ({ placeHolder }) => {
  return (
    <input
      className="w-[80%] px-5 py-1 border-0 rounded-[30px] text-wrap text-[var(--text-color)] bg-[var(--box-color)] focus:outline-none"
      type="text"
      placeholder={placeHolder}
    />
  );
};

export default InputCard;
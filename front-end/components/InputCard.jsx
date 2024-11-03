import { useState } from 'react';

const InputCard = ({ placeHolder }) => {
  const [message, setMessage] = useState('');
  const handleMessage = () => {};
  return (
    <div className="w-full">
      <input
        className="w-[80%] px-5 py-1 border-0 rounded-[30px] text-wrap text-[var(--text-color)] bg-[var(--box-color)] focus:outline-none transition-colors"
        type="text"
        placeholder={placeHolder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  );
};

export default InputCard;

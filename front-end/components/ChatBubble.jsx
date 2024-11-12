import { formatTime } from '@utils/commonFunctions'

const ChatBubble = ({ message, createdAt, session }) => {
  return (
    <div>
      {session ? (
        <div className="w-full h-auto flex justify-end">
          <div className="chat-bubble bubble-right self-end">
            <div>{message}</div>
            <div className="w-full flex text-xs">{formatTime(createdAt)}</div>
          </div>
        </div>
      ) : (
        <div className="w-full h-auto flex justify-start">
          <div className="chat-bubble bubble-left">
            <div>{message}</div>
            <div className="w-full flex justify-end text-xs">{formatTime(createdAt)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;

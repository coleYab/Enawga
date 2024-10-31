const ChatBubble = ({ message, session }) => {
  return (
    <div>
      {session ? (
        <div className="w-full h-auto flex justify-end">
          <div className="chat-bubble bubble-right self-end">{message}</div>
        </div>
      ) : (
        <div className="w-full h-auto flex justify-start">
          <div className="chat-bubble bubble-left">{message}</div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;

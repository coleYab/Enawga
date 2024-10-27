const ChatBubble = ({ message, session }) => {
  return (
    <div>
      {session ? (
        <div className="flex justify-end">
          <div className="chat-bubble bubble-right ">{message}</div>
        </div>
      ) : (
        <div className="flex justify-start">
          <div className="chat-bubble bubble-left">{message}</div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;

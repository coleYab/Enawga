import { IoArrowBack } from "react-icons/io5";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";

import { formatTime } from "@utils/commonFunctions";

const NotificationList = ({ messageList, handleNotification, handleMessageClick }) => {
  return (
    <div className="z-10 fixed w-screen h-screen flex-center bg-[#12121291]">
      <div className="bg-[var(--box-color-2)] w-[450px] h-[500px] py-4 flex-column rounded-lg gap-7">
        <i onClick={handleNotification} className="px-4">
          <IoArrowBack size={25} />
        </i>

        {messageList.length > 0 ? (
          <div className="overflow-y-auto">
            {messageList.map((message, index) => (
              <div
                key={index}
                className="flex-column px-3 mb-3 hover:bg-[var(--box-color)] hover:cursor-pointer"
                onClick={() => handleMessageClick(message)}
              >
                <div className="flex-between">
                  <div>
                    <h2 className="text-semibold text-xl">
                      {message.senderId}
                    </h2>
                    <p className="text-[var(--text-color-muted)]">
                      {message.message_content}
                    </p>
                  </div>

                  <p className="text-extralight text-sm text-[var(--text-color-muted)]">
                    {formatTime(message.createdAt)}
                  </p>
                </div>
                <hr className="w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex-column items-center justify-center">
            <MdOutlineSpeakerNotesOff size={200} />
            <h2 className="text-3xl text-semibold">You have no new messages</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;

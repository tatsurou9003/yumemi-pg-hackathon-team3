import { Link } from "@tanstack/react-router";
import { MessageData } from "@/types/messageData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";

const OogiriHistoryMessage = ({
  messageText,
  messageImage,
  deadline,
  createdBy,
}: MessageData) => {
  const isDead = new Date(deadline) < new Date();

  return (
    <div className="inline-flex items-start gap-6">
      <Avatar>
        <AvatarImage src={createdBy.profileImage} />
        <AvatarFallback className="bg-white">
          {createdBy.userName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <Link to="/home">
        <div
          className={`w-full rounded border border-gray-300 p-4 w-auto ${isDead ? "bg-[#FFE735]" : "bg-[#FFB8BA]"}`}
        >
          {messageImage && !messageText ? (
            <img
              src={messageImage}
              alt="OogiriHistoryMessage image"
              className="rounded w-[168px] h-auto"
            />
          ) : null}
          {messageText && (
            <div className="flex flex-col justify-center items-start gap-2.5 self-stretch p-[2px_12px_6px_12px]">
              <span className="text-[#743E3E] text-[12px] leading-[20px]">
                【大喜利】
                <br />
                {messageText}
              </span>
              {messageImage && (
                <img
                  src={messageImage}
                  alt="OogiriHistoryMessage image"
                  className="w-[168px] h-auto"
                />
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default OogiriHistoryMessage;

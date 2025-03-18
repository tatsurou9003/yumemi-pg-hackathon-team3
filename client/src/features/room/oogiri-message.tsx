import { Link } from "@tanstack/react-router";
import { MessageData } from "@/types/messageData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";

type OogiriMessageProps = MessageData & { isSameUser: boolean };

const OogiriMessage = ({
  messageText,
  messageImage,
  deadline,
  createdBy,
  isSameUser,
}: OogiriMessageProps) => {
  const isDead = new Date(deadline) < new Date();

  return (
    <div className="inline-flex items-start gap-6">
      {!isSameUser && (
        <Avatar>
          <AvatarImage src={createdBy.profileImage} />
          <AvatarFallback className="bg-white">
            {createdBy.userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col items-center">
        <div
          className={`w-full rounded border border-gray-300 p-4 w-auto ${isDead ? "bg-[#FFE735]" : "bg-[#FFB8BA]"}`}
        >
          {messageImage && !messageText ? (
            <img
              src={messageImage}
              alt="OogiriMessage image"
              className="rounded w-full h-auto"
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
                  alt="OogiriMessage image"
                  className="w-full h-auto"
                />
              )}
            </div>
          )}
        </div>
        <Link
          to={isDead ? "/home" : "/home"}
          className={`flex justify-end w-full text-xs font-bold cursor-pointer ${isDead ? "text-[#743E3E]" : "text-[#E73E3E]"}`}
        >
          {isDead ? "回答を見る" : "回答する"}
        </Link>
      </div>
      {isSameUser && (
        <Avatar>
          <AvatarImage src={createdBy.profileImage} />
          <AvatarFallback className="bg-white">
            {createdBy.userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default OogiriMessage;

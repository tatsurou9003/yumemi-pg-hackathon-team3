import { MessageData } from "@/types/messageData";
import { UserData } from "@/types/userData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";

const OogiriMessage = (
  { messageText, messageImage, deadline, createdBy }: MessageData,
  { userId }: UserData,
) => {
  const isSameUser = userId === createdBy.userId;
  const isDead = new Date(deadline) < new Date();

  return (
    <div className="inline-flex items-start gap-6 w-full">
      {!isSameUser && (
        <Avatar>
          <AvatarImage src={createdBy.profileImage} />
          <AvatarFallback className="bg-white">
            {createdBy.userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col items-center w-full">
        <div
          className={`w-full rounded border border-gray-300 ${isDead ? "bg-[#FFE735]" : "bg-[#FFB8BA]"}`}
        >
          {messageImage && !messageText ? (
            <img
              src={messageImage}
              alt="OogiriMessage image"
              className="rounded w-[168px] h-auto"
            />
          ) : null}
          {messageText && (
            <div className="flex flex-col justify-center items-start gap-2.5 self-stretch p-[2px_12px_6px_12px]">
              <span className="text-[#743E3E] text-[12px] leading-[20px]">
                【大喜利】
                {messageText}
              </span>
              {messageImage && (
                <img
                  src={messageImage}
                  alt="OogiriMessage image"
                  className="w-[168px] h-auto"
                />
              )}
            </div>
          )}
        </div>
        <div
          className={`flex justify-end w-full text-xs font-bold font-[Noto Sans JP] ${isDead ? "text-[#743E3E]" : "text-[#E73E3E]"
            }`}
        >
          {isDead ? "回答を見る" : "回答する"}
        </div>
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

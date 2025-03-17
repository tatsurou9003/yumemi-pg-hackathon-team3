import { MessageData } from "@/types/messageData";
import { UserData } from "@/types/userData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";
import { Star, StarGray } from "@/components/common/icon";

const Message = (
  { messageText, messageImage, createdBy }: MessageData,
  { userId }: UserData,
) => {
  const isSameUser = userId === createdBy.userId;

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
        <div className="rounded border border-gray-300 bg-gray-100 p-4 w-full">
          {messageImage && !messageText && (
            <img
              src={messageImage}
              alt="Message image"
              className="rounded w-[168px] h-auto"
            />
          )}
          {messageText && (
            <div className="flex flex-col items-start gap-2.5 self-stretch">
              <span className="text-[#743E3E] text-xs leading-[20px]">
                {messageText}
              </span>
              {messageImage && (
                <img
                  src={messageImage}
                  alt="Message image"
                  className="w-[168px] h-auto"
                />
              )}
            </div>
          )}
        </div>
        <div
          className={`flex ${isSameUser ? "justify-start" : "justify-end"} w-full gap-1 items-center`}
        >
          {true ? (
            <Star width="12px" height="12px" />
          ) : (
            <StarGray width="12px" height="12px" />
          )}
          <div className="text-[#757575] font-bold text-xs">2</div>
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

export default Message;

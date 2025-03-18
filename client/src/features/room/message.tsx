import { MessageData } from "@/types/messageData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";

type MessageProps = MessageData & { userId: string };

const Message = ({
  messageText,
  messageImage,
  createdBy,
  userId,
}: MessageProps) => {
  const isSameUser = userId === createdBy.userId;

  return (
    <div className="flex items-start gap-6">
      {!isSameUser && (
        <Avatar>
          <AvatarImage src={createdBy.profileImage} />
          <AvatarFallback className="bg-white">
            {createdBy.userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="rounded border border-gray-300 bg-gray-100 p-4 w-auto">
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

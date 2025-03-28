import Oogiri from "./oogiri";
import { Link, useLocation } from "@tanstack/react-router";
import { MessageData } from "@/types/messageData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";

type OogiriMessageProps = MessageData & { isSameUser: boolean };

const OogiriMessage = ({
  messageId,
  messageText,
  messageImage,
  deadline,
  createdBy,
  isSameUser,
}: OogiriMessageProps) => {
  const isDead = deadline ? new Date(deadline) < new Date() : false;
  const location = useLocation();

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
        <Oogiri text={messageText} image={messageImage} isDead={isDead} />
        <Link
          to={`${location.pathname}/${messageId}` as string}
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

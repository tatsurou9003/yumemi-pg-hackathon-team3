import { Link, useLocation } from "@tanstack/react-router";
import Oogiri from "./oogiri";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";
import { MessageData } from "@/types/messageData";

const OogiriHistoryMessage = ({
  messageId,
  messageText,
  messageImage,
  deadline,
  createdBy,
}: MessageData) => {
  const isDead = deadline ? new Date(deadline) < new Date() : false;
  const location = useLocation();

  return (
    <div className="inline-flex items-start gap-6">
      <Avatar>
        <AvatarImage src={createdBy.profileImage} />
        <AvatarFallback className="bg-white">
          {createdBy.userName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <Link to={`${location.pathname}/${messageId}` as string}>
        <Oogiri text={messageText} image={messageImage} isDead={isDead} />
      </Link>
    </div>
  );
};

export default OogiriHistoryMessage;

import { useState } from "react";
import { AnswerData } from "@/types/answerData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";
import { Star, StarGray } from "@/components/common/icon";

interface AnswerProps extends AnswerData {
  onGood: (id: string, liked: boolean) => void;
}

const Answer = ({
  answerId,
  answerText,
  createdBy,
  goodCount,
  isLiked,
  onGood,
}: AnswerProps) => {
  const [count, setCount] = useState<number>(goodCount);
  const [flag, setFlag] = useState<boolean>(isLiked);

  return (
    <div className="flex items-start gap-6">
      <Avatar>
        <AvatarImage src={createdBy.profileImage} />
        <AvatarFallback className="bg-white">
          {createdBy.userName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <div className="rounded border border-gray-300 bg-gray-100 p-4 w-auto">
          {answerText && (
            <span className="text-[#743E3E] text-xs leading-[20px]">
              {answerText}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {flag ? (
            <Star
              width="12px"
              height="12px"
              onClick={() => {
                setCount(count - 1);
                setFlag(!flag);
                onGood(answerId, true);
              }}
            />
          ) : (
            <StarGray
              width="12px"
              height="12px"
              onClick={() => {
                setCount(count + 1);
                setFlag(!flag);
                onGood(answerId, false);
              }}
            />
          )}
          <div className="text-[#757575] text-[12px] font-bold">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default Answer;

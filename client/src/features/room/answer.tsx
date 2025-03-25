import { AnswerData } from "@/types/answerData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";

const Answer = ({ answerText, answerImage, createdBy }: AnswerData) => {
  return (
    <div className="flex items-start gap-6">
      <Avatar>
        <AvatarImage src={createdBy.profileImage} />
        <AvatarFallback className="bg-white">
          {createdBy.userName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="rounded border border-gray-300 bg-gray-100 p-4 w-auto">
        {answerImage && !answerText && (
          <img
            src={answerImage}
            alt="Message image"
            className="rounded w-[168px] h-auto"
          />
        )}
        {answerText && (
          <div className="flex flex-col items-start gap-2.5 self-stretch">
            <span className="text-[#743E3E] text-xs leading-[20px]">
              {answerText}
            </span>
            {answerImage && (
              <img
                src={answerImage}
                alt="Message image"
                className="w-[168px] h-auto"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Answer;

import { useState } from "react";
import Answer from "./answer";
import { AnswerData } from "@/types/answerData";
import { Add } from "@/components/common/icon";

type ThreadFooterProps = {
  answers: AnswerData[];
};

const ThreadFooter = ({ answers }: ThreadFooterProps) => {
  const [answerListOpen, setAnswerListOpen] = useState<boolean>(false);
  const toggleAnswerList = () => {
    setAnswerListOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="inline-flex px-2 py-4 justify-end items-center gap-2">
        <div className="text-[#4A121A] font-inter text-[12px] font-bold">
          他の人の解答を見る
        </div>
        <Add width="24px" height="24px" onClick={toggleAnswerList} />
      </div>
      {answerListOpen && (
        <div className="flex flex-col gap-4 p-5 overflow-y-auto w-full h-[272px] bg-[#CAE071]">
          {answers.map((answer) => (
            <div className="flex justify-start" key={answer.answerId}>
              <Answer {...answer} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadFooter;

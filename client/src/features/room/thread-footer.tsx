import { useState } from "react";
import Answer from "./answer";
import { AnswerData } from "@/types/answerData";
import { Add } from "@/components/common/icon";

type ThreadFooterProps = {
  answers: AnswerData[];
  onGood: (id: string, liked: boolean) => void;
};

const ThreadFooter = ({ answers, onGood }: ThreadFooterProps) => {
  const [answerListOpen, setAnswerListOpen] = useState<boolean>(false);
  const toggleAnswerList = () => {
    setAnswerListOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full h-auto">
      <button
        onClick={toggleAnswerList}
        className="inline-flex px-2 py-4 justify-end items-center gap-2 bg-[#96BB00]"
      >
        <div className="text-[#4A121A] font-inter text-[12px] font-bold">
          他の人の解答を見る
        </div>
        <Add width="24px" height="24px" />
      </button>
      {answerListOpen && (
        <div className="flex flex-col gap-4 p-5 overflow-y-auto w-full h-[272px] bg-[#CAE071]">
          {answers.map((answer) => (
            <div className="flex justify-start" key={answer.answerId}>
              <Answer {...answer} onGood={onGood} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadFooter;

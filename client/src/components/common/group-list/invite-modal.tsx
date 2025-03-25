import { Group } from "@/types/groupData";
import { useEffect, useState } from "react";

interface InviteModalProps {
  group: Group;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

const InviteModal = ({
  group,
  onClose,
  onAccept,
  onDecline,
}: InviteModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg p-6 w-[80%] max-w-[400px] relative shadow-lg transition-all duration-300 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="閉じる"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h3 className="text-lg font-medium text-center mb-4 text-[#743E3E]">
          {group.groupName}に招待されています
        </h3>
        <p className="text-sm text-gray-600 mb-6 text-center">
          このグループの招待を受けますか？
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onDecline}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition-colors"
          >
            断る
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-[#FF9D5C] text-white rounded-md hover:bg-[#FF8D4C] transition-colors"
          >
            参加する
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;

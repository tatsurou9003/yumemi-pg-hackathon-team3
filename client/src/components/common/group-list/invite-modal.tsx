import { InviteModalProps } from "@/types/common";
import { useEffect, useState } from "react";
import { getGroups } from "@/hooks/orval/groups/groups";
import { toast } from "react-toastify";

const InviteModal = ({
  group,
  onClose,
  onAccept,
  onDecline,
}: InviteModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      await getGroups().patchGroupsUpdateMemberGroupId(group.groupId, {
        status: "JOINED",
      });
      onAccept();
    } catch (error) {
      console.error("グループ参加エラー:", error);
      toast.error("参加処理中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async () => {
    try {
      setIsLoading(true);
      await getGroups().patchGroupsUpdateMemberGroupId(group.groupId, {
        status: "REJECTED",
      });
      onDecline();
    } catch (error) {
      console.error("グループ招待拒否エラー:", error);
      toast.error("招待拒否処理中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg p-6 w-[80%] max-w-[400px] relative shadow-lg transition-all duration-300 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          disabled={isLoading}
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
            onClick={handleDecline}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md transition-colors ${
              isLoading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isLoading ? "処理中..." : "断る"}
          </button>
          <button
            onClick={handleAccept}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md transition-colors ${
              isLoading
                ? "bg-[#FFBE9D] text-white cursor-not-allowed"
                : "bg-[#FF9D5C] text-white hover:bg-[#FF8D4C]"
            }`}
          >
            {isLoading ? "処理中..." : "参加する"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;

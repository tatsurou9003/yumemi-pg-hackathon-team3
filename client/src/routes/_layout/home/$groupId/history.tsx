import { useState, useEffect, useRef } from "react";
import OogiriHistoryMessage from "@/features/room/oogiri-history-message";
import RoomHeader from "@/features/room/room-header";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { MessageData } from "@/types/messageData";
import { getGroups } from "@/hooks/orval/groups/groups";

export const Route = createFileRoute("/_layout/home/$groupId/history")({
  parseParams: (rawParams: Record<string, string>) => ({
    groupId: decodeURIComponent(rawParams.groupId).replace(
      /[^a-zA-Z0-9_-]/g,
      "",
    ), // `/` を除外
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const [messages, setMessages] = useState<MessageData[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const path = location.pathname ?? "";
  const groupId = path.split("/")[2]

  useEffect(() => {
    // 非同期関数の定義
    const fetchMessages = async () => {
      try {
        const { data } = await getGroups().getGroupsThemesGroupId(groupId);
        // setMessages(data);

        // メッセージが追加された後にスクロール
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [groupId]); // groupId の変更時に実行

  return (
    <div className="h-[calc(100vh_-_56px)] flex flex-col justify-between bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      <div className="w-full">
        <RoomHeader title="過去の大喜利" />
      </div>
      <div className="flex flex-col gap-4 p-5 overflow-y-auto">
        {messages.map(
          (message) =>
            message.messageType === "oogiri" && (
              <div className="flex justify-start" key={message.messageId}>
                <OogiriHistoryMessage {...message} />
              </div>
            ),
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default RouteComponent;

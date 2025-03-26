import { useState, useEffect, useRef } from "react";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import CloseOogiri from "@/features/room/close-oogiri";
import Message from "@/features/room/message";
import OogiriMessage from "@/features/room/oogiri-message";
import RoomFooter from "@/features/room/room-footer";
import { FormSchema } from "@/features/room/room-form";
import { MessageData } from "@/types/messageData";
import { env } from "@/env";
import { getGroups } from "@/hooks/orval/groups/groups";
import { toast } from "react-toastify";

export const Route = createFileRoute("/_layout/home/$groupId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const location = useLocation();

  const userId =
    localStorage.getItem(
      `CognitoIdentityServiceProvider.${env.USER_POOL_CLIENT_ID}.LastAuthUser`,
    ) ?? "";
  const path = location.pathname ?? "";
  const groupId = path.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatResponse = await getGroups().getGroupsChatGroupId(groupId);
        const chatDataFormatted = chatResponse.data.messages.map((message) => ({
          messageId: message.messageId,
          messageType: message.messageType,
          messageText: message.messageText,
          messageImage: message.messageImage ?? undefined,
          prizeText: message.prizeText ?? undefined,
          deadline: message.deadline ?? undefined,
          winner: message.winner ?? undefined,
          createdBy: message.createdBy ?? undefined,
          createdAt: message.createdAt ?? undefined,
        }));
        setMessages(chatDataFormatted);

        const websocket = new WebSocket(
          `${env.WS_API_URL}?userId=${userId}&groupId=${groupId}`,
        );
        socketRef.current = websocket;

        socketRef.current.onopen = () => {
          console.log("コネクションを確立しました");
        };

        socketRef.current.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          setMessages((prev) => [...prev, parsedData]);
        };

        socketRef.current.onerror = (error) => {
          console.error("エラーが発生しました:", error);
          toast.error("エラーが発生しました");
        };

        socketRef.current.onclose = () => {
          console.log("サーバとのコネクションをクローズしました");
        };
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
        toast.error("データの取得に失敗しました");
      }
    };

    fetchData();
  }, [groupId, userId]);

  const sortedMessages = (() => {
    const now = new Date();

    const timestamps = messages.flatMap((message, index) => {
      const entries = [
        // createdAtはUTCからJSTに変換
        {
          time: new Date(
            new Date(message.createdAt).getTime() + 9 * 60 * 60 * 1000,
          ),
          type: "message",
          index,
        },
      ];

      if (message.deadline) {
        // deadlineは元々JSTのためそのまま使用
        const deadlineJST = new Date(message.deadline);

        if (deadlineJST < now) {
          entries.push({
            time: deadlineJST,
            type: "deadline",
            index,
          });
        }
      }

      return entries;
    });

    // JSTに変換した後、タイムスタンプでソート
    timestamps.sort((a, b) => a.time.getTime() - b.time.getTime());

    return timestamps.map((entry, i) => {
      const message = messages[entry.index];

      // message.createdBy が null でないことを確認
      if (!message.createdBy || !message.createdBy.userId) {
        console.error(
          "message.createdBy is null or does not have userId:",
          message,
        );
        toast.error("エラーが発生しました");
        return null; // エラーハンドリング、表示しない
      }

      if (entry.type === "deadline") {
        return (
          <div key={`deadline-${i}`} className="justify-items-center">
            <CloseOogiri
              theme={message.messageText}
              to={`/home/${groupId}/${message.messageId}`}
            />
          </div>
        );
      }

      return message.messageType === "THEME" ? (
        <div
          className={`flex ${message.createdBy.userId === userId ? "justify-end" : "justify-start"}`}
          key={message.messageId}
        >
          <OogiriMessage
            {...message}
            isSameUser={message.createdBy.userId === userId}
          />
        </div>
      ) : (
        <div
          className={`flex ${message.createdBy.userId === userId ? "justify-end" : "justify-start"}`}
          key={message.messageId}
        >
          <Message {...message} userId={userId} />
        </div>
      );
    });
  })();

  const handleSend = (data: FormSchema) => {
    if (!socketRef.current) {
      return;
    }
    const newMessage = {
      action: "sendMessage",
      groupId: groupId,
      createdBy: userId,
      messageType: "CHAT",
      messageText: data.message,
    };
    socketRef.current?.send(JSON.stringify(newMessage));
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh_-_56px)] flex flex-col justify-between bg-[#FFBC92] text-xs bg-[url(/src/assets/character-room.webp)]">
      <div className="flex flex-col gap-4 p-5 overflow-y-auto">
        {sortedMessages}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <RoomFooter onSend={handleSend} />
      </div>
    </div>
  );
}

export default RouteComponent;

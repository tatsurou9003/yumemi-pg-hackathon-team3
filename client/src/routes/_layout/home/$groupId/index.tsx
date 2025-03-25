import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import CloseOogiri from "@/features/room/close-oogiri";
import Message from "@/features/room/message";
import OogiriMessage from "@/features/room/oogiri-message";
import RoomFooter from "@/features/room/room-footer";
import { FormSchema } from "@/features/room/room-form";
import { MessageData } from "@/types/messageData";
import { User } from "@/types/userData";
import { env } from "@/env";

export const Route = createFileRoute("/_layout/home/$groupId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const socketRef = useRef<any>(null);
  const location = useLocation();
  const path = location.pathname ?? "";

  useEffect(() => {
    const socket = io(env.WS_API_URL);
    // 接続の確率
    socket.on("connect", () => {
      console.log("WebSocket connected");
    });
    // メッセージの受信
    socket.on("message", (event: any) => {
      setMessages((prev) => [...prev, event.data]);
    });
    // コンポーネントがアンマウントされたときにクリーンアップ
    return () => {
      socket.disconnect();
    };
  }, []);

  const currentUser: User = {
    userId: "user123",
    userName: "自分",
    profileImage: "/images/me.jpg",
    profileColor: "#ffcc00",
  };

  const sortedMessages = (() => {
    const now = new Date();
    const timestamps = messages.flatMap((message, index) => {
      const entries = [
        { time: new Date(message.createdAt), type: "message", index },
      ];
      if (message.deadline && new Date(message.deadline) < now) {
        entries.push({
          time: new Date(message.deadline),
          type: "deadline",
          index,
        });
      }
      return entries;
    });

    timestamps.sort((a, b) => a.time.getTime() - b.time.getTime());

    return timestamps.map((entry, i) => {
      const message = messages[entry.index];

      if (entry.type === "deadline") {
        return (
          <div key={`deadline-${i}`} className="justify-items-center">
            <CloseOogiri theme={message.messageText} />
          </div>
        );
      }

      return message.messageType === "THEME" ? (
        <div
          className={`flex ${message.createdBy.userId === currentUser.userId ? "justify-end" : "justify-start"}`}
          key={message.messageId}
        >
          <OogiriMessage
            {...message}
            isSameUser={message.createdBy.userId === currentUser.userId}
          />
        </div>
      ) : (
        <div
          className={`flex ${message.createdBy.userId === currentUser.userId ? "justify-end" : "justify-start"}`}
          key={message.messageId}
        >
          <Message {...message} userId={currentUser.userId} />
        </div>
      );
    });
  })();

  const handleSend = (data: FormSchema) => {
    if (!socketRef.current) return;
    const newMessage = {
      action: "sendMessage",
      groupId: path.split("/")[2],
      messageType: "CHAT",
      createdBy: new Date().toISOString(),
      messageText: data.message,
    };

    socketRef.current.emit("message", newMessage);
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

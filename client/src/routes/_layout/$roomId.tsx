import { useEffect, useRef } from "react";
import CloseOogiri from "@/features/room/close-oogiri";
import Message from "@/features/room/message";
import OogiriMessage from "@/features/room/oogiri-message";
import RoomForm from "@/features/room/room-form";
import { createFileRoute } from "@tanstack/react-router";
import { MessageData } from "@/types/messageData";
import { UserData } from "@/types/userData";

export const Route = createFileRoute("/_layout/$roomId")({
  parseParams: ({ roomId }: { roomId: string }) => ({
    roomId: decodeURIComponent(roomId).replace(/[^a-zA-Z0-9_-]/g, ""), // `/` を除外
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const currentUser: UserData = {
    userId: "user123",
    userName: "自分",
    profileImage: "/images/me.jpg",
    profileColor: "#ffcc00",
  };

  const messages: MessageData[] = [
    {
      messageId: "msg001",
      messageType: "text",
      messageText: "お題に対する回答です！",
      messageImage: "",
      prizeText: "賞品なし",
      deadline: "2025-03-31",
      winner: "",
      createdBy: {
        userId: "user456",
        userName: "太郎",
        profileImage: "/images/taro.jpg",
        profileColor: "#ff5733",
      },
      createdAt: "2025-03-18T12:00:00Z",
    },
    {
      messageId: "msg002",
      messageType: "image",
      messageText: "",
      messageImage: "/src/assets/message-image1.png",
      prizeText: "特別賞",
      deadline: "2025-04-01",
      winner: "user123",
      createdBy: {
        userId: "user123",
        userName: "自分",
        profileImage: "/src/assets/icon/add",
        profileColor: "#ffcc00",
      },
      createdAt: "2025-03-18T12:05:00Z",
    },
    {
      messageId: "msg003",
      messageType: "oogiri",
      messageText: "ハッカソンで眠れなかった話",
      messageImage: "",
      prizeText: "最優秀賞",
      deadline: "2025-04-02",
      winner: "user456",
      createdBy: {
        userId: "user789",
        userName: "花子",
        profileImage: "/images/hanako.jpg",
        profileColor: "#33ff57",
      },
      createdAt: "2025-03-18T12:10:00Z",
    },
    {
      messageId: "msg004",
      messageType: "text",
      messageText: "あやまれ！",
      messageImage: "/src/assets/message-image1.png",
      prizeText: "なし",
      deadline: "2025-04-03",
      winner: "",
      createdBy: {
        userId: "user456",
        userName: "太郎",
        profileImage: "/images/taro.jpg",
        profileColor: "#ff5733",
      },
      createdAt: "2025-03-18T12:15:00Z",
    },
    {
      messageId: "msg005",
      messageType: "oogiri",
      messageText: "",
      messageImage: "/src/assets/message-image2.png",
      prizeText: "ユーモア賞",
      deadline: "2025-04-04",
      winner: "user789",
      createdBy: {
        userId: "user123",
        userName: "自分",
        profileImage: "/images/me.jpg",
        profileColor: "#ffcc00",
      },
      createdAt: "2025-03-18T12:20:00Z",
    },
    {
      messageId: "msg006",
      messageType: "text",
      messageText:
        "シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ、シンプルなメッセージ",
      messageImage: "",
      prizeText: "",
      deadline: "",
      winner: "",
      createdBy: {
        userId: "user987",
        userName: "健二",
        profileImage: "/images/kenji.jpg",
        profileColor: "#5733ff",
      },
      createdAt: "2025-03-18T12:25:00Z",
    },
    {
      messageId: "msg007",
      messageType: "image",
      messageText: "画像付きメッセージ",
      messageImage: "/src/assets/message-image2.png",
      prizeText: "",
      deadline: "",
      winner: "",
      createdBy: {
        userId: "user654",
        userName: "莉奈",
        profileImage: "/images/rina.jpg",
        profileColor: "#ff33aa",
      },
      createdAt: "2025-03-18T12:30:00Z",
    },
    {
      messageId: "msg008",
      messageType: "oogiri",
      messageText: "このエンジニア、何かが違う…",
      messageImage: "/src/assets/message-image2.png",
      prizeText: "参加賞",
      deadline: "2025-04-05",
      winner: "",
      createdBy: {
        userId: "user111",
        userName: "翔太",
        profileImage: "/images/shota.jpg",
        profileColor: "#33aaff",
      },
      createdAt: "2025-03-18T12:35:00Z",
    },
    {
      messageId: "msg009",
      messageType: "oogiri",
      messageText:
        "このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…、このエンジニア、何かが違う…",
      messageImage: "/src/assets/message-image2.png",
      prizeText: "",
      deadline: "",
      winner: "",
      createdBy: {
        userId: "user222",
        userName: "優子",
        profileImage: "/src/assets/message-image2.png",
        profileColor: "#aa33ff",
      },
      createdAt: "2025-03-18T12:40:00Z",
    },
    {
      messageId: "msg010",
      messageType: "oogiri",
      messageText: "このエンジニア、何かが違う…",
      messageImage: "",
      prizeText: "特別参加賞",
      deadline: "2025-04-06",
      winner: "",
      createdBy: {
        userId: "user333",
        userName: "直樹",
        profileImage: "/images/naoki.jpg",
        profileColor: "#33ff99",
      },
      createdAt: "2025-03-18T12:45:00Z",
    },
    {
      messageId: "msg010",
      messageType: "oogiri",
      messageText: "このエンジニア、何かが違う…",
      messageImage: "",
      prizeText: "特別参加賞",
      deadline: "2025-04-06",
      winner: "",
      createdBy: {
        userId: "user333",
        userName: "直樹",
        profileImage: "/images/naoki.jpg",
        profileColor: "#33ff99",
      },
      createdAt: "2025-03-18T12:45:00Z",
    },
    {
      messageId: "msg010",
      messageType: "oogiri",
      messageText: "このエンジニア、何かが違う…",
      messageImage: "",
      prizeText: "特別参加賞",
      deadline: "2025-04-06",
      winner: "",
      createdBy: {
        userId: "user333",
        userName: "直樹",
        profileImage: "/images/naoki.jpg",
        profileColor: "#33ff99",
      },
      createdAt: "2025-03-18T12:45:00Z",
    },
    {
      messageId: "msg010",
      messageType: "oogiri",
      messageText: "このエンジニア、何かが違う…",
      messageImage: "",
      prizeText: "特別参加賞",
      deadline: "2025-04-06",
      winner: "",
      createdBy: {
        userId: "user333",
        userName: "直樹",
        profileImage: "/images/naoki.jpg",
        profileColor: "#33ff99",
      },
      createdAt: "2025-03-18T12:45:00Z",
    },
    {
      messageId: "msg010",
      messageType: "oogiri",
      messageText: "このエンジニア、何かが違う…",
      messageImage: "",
      prizeText: "特別参加賞",
      deadline: "2025-04-06",
      winner: "",
      createdBy: {
        userId: "user333",
        userName: "直樹",
        profileImage: "/images/naoki.jpg",
        profileColor: "#33ff99",
      },
      createdAt: "2025-03-18T12:45:00Z",
    },
    {
      messageId: "msg010",
      messageType: "oogiri",
      messageText: "このエンジニア、何かが違う…",
      messageImage: "",
      prizeText: "特別参加賞",
      deadline: "2024-04-06",
      winner: "",
      createdBy: {
        userId: "user333",
        userName: "直樹",
        profileImage: "/images/naoki.jpg",
        profileColor: "#33ff99",
      },
      createdAt: "2025-03-18T12:45:00Z",
    },
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh_-_56px)] flex flex-col justify-between bg-[#FFBC92] text-xs bg-[url(/src/assets/character-room.webp)]">
      <div className="flex flex-col gap-4 p-5 overflow-y-auto">
        <div className="justify-items-center">
          <CloseOogiri theme="ゆめみハッカソンから飛んだエンジニア。何があった？" />
        </div>
        {messages.map((message) =>
          message.messageType === "oogiri" ? (
            <div
              className={`flex ${message.createdBy.userId === currentUser.userId
                ? "justify-end"
                : "justify-start"
                }`}
              key={message.messageId}
            >
              <OogiriMessage
                {...message}
                isSameUser={message.createdBy.userId === currentUser.userId}
              />
            </div>
          ) : (
            <div
              className={`flex ${message.createdBy.userId === currentUser.userId
                ? "justify-end"
                : "justify-start"
                }`}
              key={message.messageId}
            >
              <Message {...message} userId={currentUser.userId} />
            </div>
          ),
        )}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <RoomForm />
      </div>
    </div>
  );
}

export default RouteComponent;

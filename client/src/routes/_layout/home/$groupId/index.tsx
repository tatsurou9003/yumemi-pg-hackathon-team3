import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import CloseOogiri from "@/features/room/close-oogiri";
import Message from "@/features/room/message";
import OogiriMessage from "@/features/room/oogiri-message";
import RoomFooter from "@/features/room/room-footer";
import { createFileRoute } from "@tanstack/react-router";
import { MessageData } from "@/types/messageData";
import { User } from "@/types/userData";

export const Route = createFileRoute("/_layout/home/$groupId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const token = "";
  const socketUrl = "";
  const [messages, setMessages] = useState<MessageData[]>([
    {
      messageId: "msg1",
      messageType: "oogiri",
      messageText: "面白い回答を考えてみてください！",
      messageImage: "",
      prizeText: "優勝者には特別賞！",
      deadline: "2025-03-30T23:59:59Z",
      winner: "",
      createdBy: {
        userId: "user1",
        userName: "太郎",
        profileImage: "https://example.com/profile1.jpg",
        profileColor: "#FF5733"
      },
      createdAt: "2025-03-25T08:15:00Z"
    },
    {
      messageId: "msg2",
      messageType: "text",
      messageText: "今日はとてもいい天気ですね。",
      messageImage: "",
      prizeText: "",
      deadline: "",
      winner: "",
      createdBy: {
        userId: "user2",
        userName: "花子",
        profileImage: "https://example.com/profile2.jpg",
        profileColor: "#337BFF"
      },
      createdAt: "2025-03-24T15:45:00Z"
    },
    {
      messageId: "msg3",
      messageType: "oogiri",
      messageText: "この画像に面白いキャプションをつけてください！",
      messageImage: "https://example.com/image1.jpg",
      prizeText: "ベストキャプション賞！",
      deadline: "2025-04-01T12:00:00Z",
      winner: "",
      createdBy: {
        userId: "user3",
        userName: "次郎",
        profileImage: "https://example.com/profile3.jpg",
        profileColor: "#22BB33"
      },
      createdAt: "2025-03-26T10:30:00Z"
    },
    {
      messageId: "msg4",
      messageType: "text",
      messageText: "最近読んだ本でおすすめは？",
      messageImage: "",
      prizeText: "",
      deadline: "",
      winner: "",
      createdBy: {
        userId: "user4",
        userName: "三郎",
        profileImage: "https://example.com/profile4.jpg",
        profileColor: "#FF33AA"
      },
      createdAt: "2025-03-23T19:20:00Z"
    },
    {
      messageId: "msg5",
      messageType: "oogiri",
      messageText: "この状況を一言で表すと？",
      messageImage: "https://example.com/image2.jpg",
      prizeText: "最優秀賞！",
      deadline: "2025-04-05T18:00:00Z",
      winner: "",
      createdBy: {
        userId: "user5",
        userName: "四郎",
        profileImage: "https://example.com/profile5.jpg",
        profileColor: "#FFA500"
      },
      createdAt: "2025-03-27T14:10:00Z"
    },
    {
      messageId: "msg6",
      messageType: "text",
      messageText: "好きな映画は何ですか？",
      messageImage: "",
      prizeText: "",
      deadline: "",
      winner: "",
      createdBy: {
        userId: "user6",
        userName: "五郎",
        profileImage: "https://example.com/profile6.jpg",
        profileColor: "#800080"
      },
      createdAt: "2025-03-22T09:05:00Z"
    },
    {
      messageId: "msg7",
      messageType: "oogiri",
      messageText: "この写真にユーモアを加えてみてください！",
      messageImage: "https://example.com/image3.jpg",
      prizeText: "最も面白い賞！",
      deadline: "2025-03-21T20:00:00Z",
      winner: "",
      createdBy: {
        userId: "user7",
        userName: "六郎",
        profileImage: "https://example.com/profile7.jpg",
        profileColor: "#008000"
      },
      createdAt: "2025-03-28T16:25:00Z"
    },
    {
      messageId: "msg8",
      messageType: "text",
      messageText: "最近のマイブームは？",
      messageImage: "",
      prizeText: "",
      deadline: "",
      winner: "",
      createdBy: {
        userId: "user8",
        userName: "七郎",
        profileImage: "https://example.com/profile8.jpg",
        profileColor: "#FF4500"
      },
      createdAt: "2025-03-21T12:40:00Z"
    },
    {
      messageId: "msg9",
      messageType: "oogiri",
      messageText: "このシチュエーションにタイトルをつけてください！",
      messageImage: "https://example.com/image4.jpg",
      prizeText: "名タイトル賞！",
      deadline: "2025-04-10T15:30:00Z",
      winner: "",
      createdBy: {
        userId: "user9",
        userName: "八郎",
        profileImage: "https://example.com/profile9.jpg",
        profileColor: "#4682B4"
      },
      createdAt: "2025-03-29T11:55:00Z"
    },
    {
      messageId: "msg10",
      messageType: "text",
      messageText: "今週の目標は何ですか？",
      messageImage: "",
      prizeText: "",
      deadline: "",
      winner: "",
      createdBy: {
        userId: "user10",
        userName: "九郎",
        profileImage: "https://example.com/profile10.jpg",
        profileColor: "#0000CD"
      },
      createdAt: "2025-03-20T07:30:00Z"
    }
  ]);

  useEffect(() => {
    const socket = io(socketUrl);
    // 接続の確率
    socket.on("connect", () => {
      console.log("WebSocket connected");
    });
    // メッセージの受信
    socket.on("message", (event) => {
      setMessages((prev) => [...prev, event.data]);
    });
    // コンポーネントがアンマウントされたときにクリーンアップ
    return () => {
      socket.disconnect();
    };
  }, [socketUrl, token]);

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

      return message.messageType === "oogiri" ? (
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
        <RoomFooter />
      </div>
    </div>
  );
}

export default RouteComponent;

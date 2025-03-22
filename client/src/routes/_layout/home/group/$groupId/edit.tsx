import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/home/group/$groupId/edit")({
  component: RouteComponent,
});
// TODO: ルーム画面のアイコンからここに飛べるようにする

// src/mock/userData.ts
import { User } from "@/types/userTypes";

const mockUsers: User[] = [
  {
    userId: "u001",
    userName: "田中太郎",
    profileImage: "/src/assets/avatars/avatar1.png",
    profileColor: "#FFB6C1",
  },
  {
    userId: "u002",
    userName: "鈴木花子",
    profileImage: "/src/assets/avatars/avatar2.png",
    profileColor: "#ADD8E6",
  },
  {
    userId: "u003",
    userName: "山田勇気",
    profileImage: "/src/assets/avatars/avatar3.png",
    profileColor: "#90EE90",
  },
  {
    userId: "u004",
    userName: "佐藤めぐみ",
    profileImage: "/src/assets/avatars/avatar4.png",
    profileColor: "#FFFFE0",
  },
  {
    userId: "u005",
    userName: "中村拓也",
    profileImage: "/src/assets/avatars/avatar5.png",
    profileColor: "#E6E6FA",
  },
  {
    userId: "u006",
    userName: "エンジニア太郎",
    profileImage: "",
    profileColor: "#FFA07A",
  },
  {
    userId: "u007",
    userName: "デザイナー花子",
    profileImage: "",
    profileColor: "#87CEFA", // ライトスカイブルー
  },
];

function RouteComponent() {
  return <div>Hello "/_layout/home/group/$groupId/edit"!</div>;
}

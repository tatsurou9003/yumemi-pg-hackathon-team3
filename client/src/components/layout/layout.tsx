import { useState } from "react";
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";
import { useGroup } from "@/hooks/useGroup";

interface LayoutProps {
  path: string;
  version: string;
  avatar: string;
  children: React.ReactNode;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  path,
  version,
  avatar,
  children,
  onLogout,
}) => {
  const { getGroupNameById, currentGroup } = useGroup();

  // タイトルを取得する関数
  const getTitle = () => {
    // 静的なルート
    if (path === "/home") return "ホーム";
    if (path === "/profile") return "プロフィール";
    if (path === "/home/group/create") return "グループ作成";
    // 動的なルート
    if (path.match(/^\/home\/group\/\w+\/edit$/)) {
      return "メンバー編集";
    }
    if (path.match(/^\/home\/\w+$/)) {
      // roomIdに基づいてグループ名を取得
      const roomId = path.split("/").pop() || "";
      // コンテキストからグループ名を取得
      return currentGroup?.groupName || getGroupNameById(roomId);
    }
    return "エラー";
  };

  const getTo = () => {
    // 静的なルート
    if (path === "/profile") return "/home";
    if (path === "/home/group/create") return "/home";
    // 動的なルート
    if (path.match(/^\/home\/group\/\w+\/edit$/)) {
      return "/home";
    }
    if (path.match(/^\/home\/\w+$/)) {
      return "/home";
    }
    if (path.match(/^\/home\/\w+\/post$/)) {
      const roomId = path.split("/")[2]; // "/home/roomId/post" から "roomId" を取得
      return `/home/${roomId}`;
    }
    return "/";
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        to={getTo()}
        title={getTitle()}
        avatar={avatar}
        onSidebar={handleSidebar}
      />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-[0.5px] z-30 transition-all duration-300"
          onClick={handleSidebar}
        />
      )}
      <div
        className={`fixed top-[56px] left-0 h-[calc(100vh_-_56px)] z-40 transition-transform duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar version={version} onLogout={onLogout} />
      </div>
      <div className="flex flex-row">
        <main className="flex-1 bg-white">{children}</main>
      </div>
    </div>
  );
};

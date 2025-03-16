import { useState } from "react";
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";

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
  const titleMap: Record<string, string> = {
    "/home": "ホーム",
    "/profile": "プロフィール",
    // "/home/[roomID]": "グループ名",
    // "/home/[roomId]/post": "グループ名",
    // "/home/[roomId]/[threadId]": "グループ名",
    "/home/group": "グループ作成",
  };
  const toMap: Record<string, string> = {
    "/profile": "/home",
    // "/home/[roomID]": "/home",
    // "/home/[roomId]/post": "/home/[roomID]",
    // "/home/[roomId]/[threadId]": "/home/[roomID]",
    "/home/group": "/home",
  };
  const getTitle = () => {
    return titleMap[path] || "エラー";
  };
  const getTo = () => {
    return toMap[path] || "/";
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
        className={`fixed top-[56px] left-0 h-[calc(100vh_-_56px)] z-40 transition-transform duration-300 ease-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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

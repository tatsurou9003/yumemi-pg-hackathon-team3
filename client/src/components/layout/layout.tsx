import { useState } from "react";
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";

interface LayoutProps {
  version: string;
  avatar: string;
  children: React.ReactNode;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  version,
  avatar,
  children,
  onLogout,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header avatar={avatar} onSidebar={handleSidebar} />
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
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
};

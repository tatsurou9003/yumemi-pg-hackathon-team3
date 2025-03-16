import { useState } from "react";
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";

interface LayoutProps {
  version: string;
  title: string;
  avatar: string;
  children: React.ReactNode;
  onLogout: () => void;
  onBack: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  version,
  title,
  avatar,
  children,
  onLogout,
  onBack,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleClick = () => {
    if (title === "ホーム") {
      setSidebarOpen((prevState) => !prevState);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={title} avatar={avatar} onClick={handleClick} />
      <div className="flex flex-row">
        {isSidebarOpen && <Sidebar version={version} onLogout={onLogout} />}
        <main className="flex-1 p-4 bg-white">{children}</main>
      </div>
    </div>
  );
};

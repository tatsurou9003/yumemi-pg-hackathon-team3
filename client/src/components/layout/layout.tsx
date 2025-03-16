import { Header } from "./header/header";

interface LayoutProps {
  title: string;
  avator: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ title, avator, children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={title} avator={avator} />
      <main className="flex-1 bg-white text-black">{children}</main>
    </div>
  );
};

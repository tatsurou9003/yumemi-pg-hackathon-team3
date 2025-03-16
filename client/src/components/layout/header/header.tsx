import { Link } from "@tanstack/react-router";
import { HeaderAvatar } from "./header-avatar";
import { ChevronLeft, HamburgerButton } from "@/components/common/icon";

interface HeaderProps {
  to: string;
  title: string;
  avatar: string;
  onSidebar: () => void;
}

export const Header = ({ to, title, avatar, onSidebar }: HeaderProps) => {
  return (
    <div className="flex w-full h-[56px] p-2 items-center gap-1.5 bg-[#FF7C2A]">
      {title === "ホーム" ? (
        <button
          onClick={onSidebar}
          className="flex justify-center items-center p-2"
        >
          <HamburgerButton
            width="24px"
            height="24px"
            className="cursor-pointer"
          />
        </button>
      ) : (
        <Link to={to} className="flex justify-center items-center p-2">
          <ChevronLeft width="24px" height="24px" />
        </Link>
      )}
      <div className="flex-grow text-center text-white text-[12px] font-semibold leading-[28px]">
        {title}
      </div>
      <div className="flex justify-end">
        <HeaderAvatar src={avatar} />
      </div>
    </div>
  );
};

import { useNavigate } from "@tanstack/react-router";
import { HeaderAvatar } from "./header-avatar";
import {
  ChevronLeft,
  HamburgerButton,
  StickyNote,
} from "@/components/common/icon";

interface HeaderProps {
  to: string;
  title: string;
  avatar: string;
  onSidebar: () => void;
}

export const Header = ({ to, title, avatar, onSidebar }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-[56px] p-2 items-center gap-1.5 bg-[#FF7C2A]">
      {title === "ホーム" ? (
        <HamburgerButton
          width="24px"
          height="24px"
          className="cursor-pointer"
          onClick={onSidebar}
        />
      ) : (
        <ChevronLeft
          width="24px"
          height="24px"
          className="cursor-pointer"
          onClick={() => {
            navigate({ to: to });
          }}
        />
      )}
      <div className="flex-grow text-center text-white text-[12px] font-semibold leading-[28px]">
        {title}
      </div>
      <div className="flex items-center justify-end gap-4">
        {title === "ルーム" && (
          <StickyNote
            width="18px"
            height="18px"
            className="cursor-pointer"
            onClick={() => {
              navigate({
                to: "/home/$roomId/history",
                params: { roomId: "someRoomId" },
              });
            }}
          />
        )}
        <HeaderAvatar src={avatar} />
      </div>
    </div>
  );
};

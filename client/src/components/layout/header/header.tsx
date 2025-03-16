import { HeaderAvatar } from "./header-avatar";
import { ChevronLeft, HamburgerButton } from "@/components/common/icon";

interface HeaderProps {
  title: string;
  avatar: string;
  onClick: () => void;
}

// TODO: 招待カードの追加

export const Header = ({ title, avatar, onClick }: HeaderProps) => {
  return (
    <div className="flex w-full h-[56px] p-2 items-center gap-1.5 bg-[#FF7C2A]">
      <button
        onClick={onClick}
        className="flex justify-center items-center p-2"
      >
        {title === "ホーム" ? (
          <HamburgerButton width="24px" height="24px" />
        ) : (
          <ChevronLeft width="24px" height="24px" />
        )}
      </button>
      <div className="flex-grow text-center text-white text-[12px] font-semibold leading-[28px]">
        {title}
      </div>
      <div className="flex justify-end">
        <HeaderAvatar
          src={avatar}
          onClick={() => {
            console.log("Avatar clicked");
          }}
        />
      </div>
    </div>
  );
};

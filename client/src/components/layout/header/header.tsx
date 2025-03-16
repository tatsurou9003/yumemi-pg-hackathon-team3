import { HeaderAvatar } from "./header-avator";
import { ChevronLeft, HamburgerButton } from "@/components/common/icon";

interface HeaderProps {
  title: string;
  avator: string;
}

// TODO: onClick時のルーティング、サイドバー展開の追加
// TODO: 招待カードの追加

export const Header: React.FC<HeaderProps> = ({ title, avator }) => {
  return (
    <div className="flex w-full h-[56px] p-2 items-center gap-1.5 bg-[#FF7C2A]">
      <button
        onClick={() => {
          console.log("Navigation button clicked");
        }}
        className="flex justify-center items-center p-2 text-white text-[12px]"
      >
        {title === "ホーム" ? <HamburgerButton /> : <ChevronLeft />}
      </button>
      <div className="flex-grow text-center text-white text-[12px] font-semibold leading-[28px]">
        {title}
      </div>
      <div className="flex justify-end">
        <HeaderAvatar
          src={avator}
          onClick={() => {
            console.log("Avatar clicked");
          }}
        />
      </div>
    </div>
  );
};

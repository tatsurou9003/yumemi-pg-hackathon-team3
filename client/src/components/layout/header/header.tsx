import { HeaderAvatar } from "./header-avator";
import { HamburgerButton } from "@/components/common/icon";

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
        onClick={() => { }}
        className="flex justify-center items-center text-white text-[12px]"
      >
        {title === "/home" ? <HamburgerButton /> : <>＜</>}
      </button>
      <div className="flex-grow text-center text-white text-[12px] font-semibold leading-[28px]">
        {title}
      </div>
      <div className="flex justify-end">
        <HeaderAvatar src={avator} onClick={() => { }} />
      </div>
    </div>
  );
};

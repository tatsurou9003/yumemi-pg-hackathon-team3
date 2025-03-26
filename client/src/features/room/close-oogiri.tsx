import { Link } from "@tanstack/react-router";

interface CloseOogiriProps {
  theme: string;
  to: string;
}

const CloseOogiri = ({ theme, to }: CloseOogiriProps) => {
  const maxLength = 30;
  const truncatedTheme =
    theme.length > maxLength ? theme.substring(0, maxLength) + "..." : theme;

  return (
    <div className="flex flex-col items-center w-full max-w-[500px] text-xs text-[#6E6E6E]">
      <div className="font-bold text-[8px] w-full px-9 py-1 text-center bg-[#D9D9D9] rounded-[4px]">
        【大喜利】{truncatedTheme}が終了しました。
      </div>
      <div className="flex justify-end w-full">
        <Link to={to} className="text-[#743E3E] font-bold text-[10px]">
          ＞結果を見る
        </Link>
      </div>
    </div>
  );
};

export default CloseOogiri;

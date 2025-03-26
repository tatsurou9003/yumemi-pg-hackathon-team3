import { UserCardProps } from "@/types/common";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import { FlipCamera, SettingsIcon } from "../icon";
import { Copy } from "lucide-react";

const UserCard = ({
  name,
  src,
  id,
  profileColor,
  onSettings,
  onCamera,
}: UserCardProps) => {
  console.log(profileColor);
  const truncateId = (id: string, maxLength = 8) => {
    if (id.length <= maxLength) return id;
    return `${id.substring(0, maxLength)}...`;
  };

  // IDをクリップボードにコピーする関数
  const copyIdToClipboard = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        // コピー成功時の処理（オプション）
        alert("IDをコピーしました");
      })
      .catch((err) => {
        console.error("コピーに失敗しました:", err);
      });
  };

  return (
    <div
      className={`w-[150px] h-[224px] flex flex-col rounded-[4px] p-[36px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] relative text-[#FFF] font-inter text-[12px] font-[700] leading-normal`}
      style={{ backgroundColor: profileColor }}
    >
      <SettingsIcon
        width="12px"
        height="12px"
        className="absolute top-2 right-2 cursor-pointer"
        onClick={onSettings}
      />
      <div className="flex flex-col h-full justify-between items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="text-center break-words">{name}</div>
          <div className="relative mt-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src={src} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <FlipCamera
              width="24px"
              height="24px"
              className="absolute bottom-0 right-0 cursor-pointer"
              onClick={onCamera}
            />
          </div>
        </div>
        <div>
          <div className="text-center whitespace-nowrap flex items-center justify-center">
            ID: {truncateId(id)}
            <button
              onClick={copyIdToClipboard}
              className="cursor-pointer rounded-full ml-2 "
              title="IDをコピー"
            >
              <Copy className="w-3 h-3 p-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserCard };

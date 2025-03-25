import { UserCardProps } from "@/types/common";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import { FlipCamera, SettingsIcon } from "../icon";

const UserCard = ({ name, src, id, onSettings, onCamera }: UserCardProps) => {
  return (
    <div className="w-[150px] h-[224px] flex flex-col rounded-[4px] p-[36px] bg-[#354CFF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] relative text-[#FFF] font-inter text-[12px] font-[700] leading-normal">
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
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <FlipCamera
              width="24px"
              height="24px"
              className="absolute bottom-0 right-0 p-1 cursor-pointer"
              onClick={onCamera}
            />
          </div>
        </div>
        <div className="text-center">ID {id}</div>
      </div>
    </div>
  );
};

export { UserCard };

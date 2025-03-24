import { useNavigate, useLocation } from "@tanstack/react-router";
import { HeaderAvatar } from "./header-avatar";
import {
  ChevronLeft,
  HamburgerButton,
  StickyNote,
} from "@/components/common/icon";
import { useGroup } from "@/hooks/useGroup";

interface HeaderProps {
  avatar: string;
  onSidebar: () => void;
}

export const Header = ({ avatar, onSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname ?? "";
  const { getGroupNameById, currentGroup } = useGroup();

  // タイトルを取得する関数
  const getTitle = () => {
    // 静的なルート
    if (path === "/home") return "ホーム";
    if (path === "/profile") return "プロフィール";
    if (path === "/home/group/create") return "グループ作成";
    // 動的なルート
    if (path.match(/^\/home\/group\/\w+\/edit$/)) {
      return "メンバー編集";
    }
    if (path.match(/^\/home\/\w+(\/\w+)?$/)) {
      // roomIdに基づいてグループ名を取得
      const roomId = path.split("/")[2] || "";
      // コンテキストからグループ名を取得
      return currentGroup?.groupName || getGroupNameById(roomId);
    }
    return "エラー";
  };

  const getTo = () => {
    // 静的なルート
    if (path === "/profile") return "/home";
    if (path === "/home/group/create") return "/home";
    // 動的なルート
    if (path.match(/^\/home\/group\/\w+\/edit$/)) {
      return "/home";
    }
    if (path.match(/^\/home\/\w+$/)) {
      return "/home";
    }
    if (path.match(/^\/home\/\w+\/\w+$/)) {
      const roomId = path.split("/")[2]; // "/home/roomId/..." から "roomId" を取得
      return `/home/${roomId}`;
    }
    return "/";
  };

  const isRoomPath = path.match(/^\/home\/\w+(\/\w+)?$/);
  const roomId = isRoomPath ? path.split("/")[2] : null;

  return (
    <div className="flex w-full h-[56px] p-2 items-center gap-1.5 bg-[#FF7C2A]">
      {path === "/home" ? (
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
            navigate({ to: getTo() });
          }}
        />
      )}
      <div
        className={`flex-grow text-white text-[12px] font-semibold leading-[28px] ${
          roomId ? "text-left" : "text-center"
        }`}
      >
        {getTitle()}
      </div>
      <div className="flex items-center justify-end gap-4">
        {roomId && (
          <StickyNote
            width="18px"
            height="18px"
            className="cursor-pointer"
            onClick={() => {
              navigate({
                to: `/home/${roomId}/history`,
              });
            }}
          />
        )}
        <HeaderAvatar src={avatar} />
      </div>
    </div>
  );
};

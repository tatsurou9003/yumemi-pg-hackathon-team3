import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { HomeAvatar } from "./home-avatar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";
import {
  ChevronLeft,
  HamburgerButton,
  StickyNote,
} from "@/components/common/icon";
import { HeaderProps } from "@/types/layout";
import { getUsers } from "@/hooks/orval/users/users";

export const Header = ({ avatar, onSidebar }: HeaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname ?? "";
  const avatarRef = useRef<HTMLButtonElement | null>(null);
  const [groupInfo, setGroupInfo] = useState<{
    groupName: string;
    memberCount: number;
  } | null>(null);
  const [userInfo, setUserInfo] = useState<{
    userId: string;
    userName: string;
    profileImage: string;
    profileColor: string;
  } | null>(null);

  // URLからgroupIdを取得
  const isRoomPath = path.match(/^\/home\/[\w-]+(\/[\w-]+)?$/);
  let groupId = isRoomPath ? path.split("/")[2] : null;
  if (groupId === "policy" || groupId === "group") {
    groupId = null;
  }

  // グループ情報とユーザー情報を取得する
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getUsers().getUsersHome();
        const data = response.data;

        if (data) {
          // ユーザー情報を設定
          setUserInfo({
            userId: data.userId || "",
            userName: data.userName || "",
            profileImage: data.profileImage || "",
            profileColor: data.profileColor || "",
          });

          // グループ情報を設定（既存のコード）
          if (groupId && data.groups) {
            const targetGroup = data.groups.find(
              (group) => group.groupId === groupId,
            );
            if (
              targetGroup &&
              targetGroup.groupName &&
              targetGroup.memberCount !== undefined
            ) {
              setGroupInfo({
                groupName: targetGroup.groupName,
                memberCount: targetGroup.memberCount,
              });
            }
          } else {
            setGroupInfo(null);
          }
        }
      } catch (error) {
        console.error("情報の取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [groupId, path]);

  // タイトルを取得する関数
  const getTitle = () => {
    // 静的なルート
    if (path === "/login") return "ログイン";
    if (path === "/signup" || path === "/verify" || path === "/setting")
      return "新規登録";
    if (path === "/home" || path === "/home/policy") return "ホーム";
    if (path === "/home/group") return "グループ作成";
    if (path === "/profile") return "プロフィール";
    // 動的なルート
    if (path.match(/^\/home\/[\w-]+\/edit$/)) {
      return "メンバー編集";
    }
    // グループページまたは履歴ページ
    if (path.match(/^\/home\/[\w-]+(\/?|\/[a-fA-F0-9-]{36})$/)) {
      // ロード中の場合
      if (isLoading) {
        return "";
      }
      if (groupInfo) {
        return `${groupInfo.groupName} (${groupInfo.memberCount})`;
      }
    }
    // グループページまたは履歴ページ
    if (path.match(/^\/home\/[\w-]+(\/?|\/[\w-]+)$/)) {
      // ロード中の場合
      if (isLoading) {
        return "";
      }
      if (groupInfo) {
        return `${groupInfo.groupName} (${groupInfo.memberCount})`;
      }
    }
    return "エラー";
  };

  const getTo = () => {
    if (
      path === "/profile" ||
      path === "/home/group" ||
      path.match(/^\/home\/\w+\/\w+\/edit$/) ||
      path.match(/^\/home\/[\w-]+$/)
    )
      return "/home";
    if (path.match(/^\/home\/[\w-]+\/[\w-]+$/)) {
      const groupId = path.split("/")[2];
      return `/home/${groupId}`;
    }
    return "/";
  };

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
          groupId ? "text-left" : "text-center"
        }`}
      >
        {getTitle()}
      </div>
      {!(path === "/login" || path === "/signup" || path === "/complete") && (
        <div className="flex items-center justify-end gap-4">
          {groupId ? (
            <>
              <StickyNote
                width="18px"
                height="18px"
                className="cursor-pointer"
                onClick={() => {
                  navigate({
                    to: `/home/${groupId}/history`,
                  });
                }}
              />
              <button
                onClick={() => {
                  navigate({ to: `/home/${groupId}/edit` });
                }}
                ref={avatarRef}
                className="border-none bg-transparent cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={avatar} />
                  <AvatarFallback>
                    {groupInfo?.groupName ? groupInfo.groupName.charAt(0) : ""}
                  </AvatarFallback>
                </Avatar>
              </button>
            </>
          ) : (
            <HomeAvatar
              isPreview={false}
              src={userInfo?.profileImage || avatar}
              userName={userInfo?.userName || ""}
              profileColor={userInfo?.profileColor || ""}
              userId={userInfo?.userId || ""}
            />
          )}
        </div>
      )}
    </div>
  );
};

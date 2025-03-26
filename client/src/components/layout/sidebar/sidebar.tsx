import { useNavigate } from "@tanstack/react-router";
import SidebarListItem from "./sidebar-list-item";
import { CharacterWink, InfoIcon } from "@/components/common/icon";
import { SidebarProps } from "@/types/layout";
import { Amplify, Auth } from "aws-amplify";
import { env } from "@/env";

// Amplify の設定
Amplify.configure({
  Auth: {
    region: "ap-northeast-1",
    userPoolId: env.USER_POOL_ID,
    userPoolWebClientId: env.USER_POOL_CLIENT_ID,
  },
});

export const Sidebar = ({ version }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between items-center w-[280px] h-full bg-white py-10 shadow-lg">
      <div className="flex flex-col items-start gap-6 w-full">
        <div className="flex items-center gap-4 px-6 py-2 w-full">
          <InfoIcon width="24px" height="24px" />
          <span className="text-[#743E3E] font-noto text-sm">
            wa-live!について
          </span>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <SidebarListItem
            text="プライバシーポリシー"
            onClick={() => {
              navigate({ to: "/home/policy" });
            }}
          />
          <SidebarListItem text="利用規約" onClick={() => {}} />
          <div className="flex justify-between items-center py-2 px-6 pr-8 w-full text-[#743E3E] font-noto text-sm">
            <span>アプリバージョン</span>
            <div>{version}</div>
          </div>
        </div>
      </div>
      <CharacterWink width="197px" height="221.246px" />
      <SidebarListItem
        text="ログアウト"
        onClick={async () => {
          await Auth.signOut();
          navigate({ to: "/login" });
        }}
      />
    </div>
  );
};

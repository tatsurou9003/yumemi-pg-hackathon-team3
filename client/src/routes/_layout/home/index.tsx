import GroupList from "@/components/common/group-list/group-list";
import InvitedGroupList from "@/components/common/group-list/invited-group-list";
import { createFileRoute } from "@tanstack/react-router";
import CreateGroup from "@/features/home/create-group";
import HeaderCarousel from "@/features/home/header-carousel";
import { useEffect, useState } from "react";
import { getUsers } from "@/hooks/orval/users/users";
import { toast } from "react-toastify";
import LoadingIndicator from "@/components/common/loading/loading";
import { Group } from "@/types/common";

export const Route = createFileRoute("/_layout/home/")({
  // ローダーを追加してデータ取得を行う
  loader: async () => {
    try {
      const response = await getUsers().getUsersHome();
      return response.data;
    } catch (error) {
      console.error("ユーザーデータの取得に失敗しました:", error);
      return { groups: [] };
    }
  },
  component: RouteComponent,
});

// ヘッダー画像の配列
const headerImages = ["/header1.png", "/header2.png", "/header3.png"];

function RouteComponent() {
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
  const [invitedGroups, setInvitedGroups] = useState<Group[]>();
  const [isLoading, setIsLoading] = useState(true);

  const userData = Route.useLoaderData();

  useEffect(() => {
    if (userData) {
      setIsLoading(true);
      try {
        if (userData.groups) {
          // グループを参加中と招待中で分類
          const joined: Group[] = [];
          const invited: Group[] = [];

          userData.groups.forEach((group) => {
            // statusが"invited"なら招待中グループ、それ以外なら参加中グループ
            const groupItem = {
              groupId: group.groupId || "",
              groupName: group.groupName || "",
              groupImage: group.groupImage || "",
              memberCount: group.memberCount || 0,
            };

            if (group.status === "INVITED") {
              invited.push(groupItem);
            } else {
              joined.push(groupItem);
            }
          });

          // 状態を更新
          setJoinedGroups(joined);
          setInvitedGroups(invited);
        }
      } catch (error) {
        console.error("データの処理に失敗しました:", error);
        toast.error("グループ情報の読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    }
  }, [userData]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="h-full bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      {/*今後の展望: イベントページを作成し、ジャンプできるようにする*/}
      <HeaderCarousel images={headerImages} />

      {invitedGroups && invitedGroups.length > 0 && (
        <section className="w-full text-[#743E3E] bg-[#FFBC92]">
          <div className="flex items-center p-[14px_0_9px_14px]">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2 flex items-center justify-center text-white text-[10px]">
              新
            </div>
            <p>招待されているグループ一覧</p>
          </div>
          <InvitedGroupList groupData={invitedGroups} />
        </section>
      )}

      <section className="w-full text-[#743E3E] bg-[#FFBC92]">
        <p className="p-[14px_0_9px_14px]">グループ一覧</p>
        {joinedGroups.length > 0 ? (
          <GroupList groupData={joinedGroups} />
        ) : (
          <p className="p-[14px_0_9px_14px]">
            参加しているグループはありません
          </p>
        )}
      </section>

      <section className="m-[20px_12px]">
        <CreateGroup />
      </section>
    </div>
  );
}

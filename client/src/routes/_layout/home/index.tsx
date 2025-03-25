import GroupList from "@/components/common/group-list/group-list";
import InvitedGroupList from "@/components/common/group-list/invited-group-list";
import { createFileRoute } from "@tanstack/react-router";
import CreateGroup from "@/features/home/create-group";
import HeaderCarousel from "@/features/home/header-carousel";
import { useGroup } from "@/hooks/useGroup";
import { useEffect, useState } from "react";
import { getUsers } from "@/hooks/orval/users/users";
import { toast } from "react-toastify";
import { Group } from "@/types/groupData";

export const Route = createFileRoute("/_layout/home/")({
  component: RouteComponent,
});

// ヘッダー画像の配列
const headerImages = [
  "/src/assets/header1.png",
  "/src/assets/header2.png",
  "/src/assets/header3.png",
];

function RouteComponent() {
  const { setGroups } = useGroup();
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
  const [invitedGroups, setInvitedGroups] = useState<Group[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // APIからユーザーホーム情報を取得
        const { data } = await getUsers().getUsersHome();

        if (data.groups) {
          // グループを参加中と招待中で分類
          const joined: Group[] = [];
          const invited: Group[] = [];

          data.groups.forEach((group) => {
            // statusが"invited"なら招待中グループ、それ以外なら参加中グループ
            const groupItem = {
              groupId: group.groupId || "",
              groupName: group.groupName || "",
              groupImage: group.groupImage || "",
              memberCount: group.memberCount || 0,
            };

            if (group.status === "invited") {
              invited.push(groupItem);
            } else {
              joined.push(groupItem);
            }
          });

          // 状態を更新
          setJoinedGroups(joined);
          setInvitedGroups(invited);

          // コンテキストにも参加中グループを設定
          setGroups(joined);
        }
      } catch (error) {
        console.error("ユーザーデータの取得に失敗しました:", error);
        toast.error("グループ情報の読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setGroups]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#FFBC92]">
        読み込み中...
      </div>
    );
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

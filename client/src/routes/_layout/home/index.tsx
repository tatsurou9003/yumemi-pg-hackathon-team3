import GroupList from "@/components/common/group-list/group-list";
import InvitedGroupList from "@/components/common/group-list/invited-group-list";
import { createFileRoute } from "@tanstack/react-router";
import CreateGroup from "@/features/home/create-group";
import HeaderCarousel from "@/features/home/header-carousel";
import { useGroup } from "@/hooks/useGroup";
import { useEffect } from "react";

export const Route = createFileRoute("/_layout/home/")({
  component: RouteComponent,
});

// TODO: APIで招待されている&参加しているグループ取得
const groupData = [
  {
    groupName: "大喜利三昧",
    count: 5,
    groupImage: "",
    groupId: "1",
  },
  {
    groupName: "エンジニア大喜利大会",
    count: 123,
    groupImage: "",
    groupId: "2",
  },
];

// TODO: APIで招待されているグループ取得
const invitedGroupData = [
  {
    groupName: "招待された大喜利",
    count: 8,
    groupImage: "",
    groupId: "3",
  },
];

// ヘッダー画像の配列
const headerImages = [
  "/src/assets/header1.png",
  "/src/assets/header2.png",
  "/src/assets/header3.png",
];

function RouteComponent() {
  const { setGroups } = useGroup();

  // コンポーネントマウント時にグループデータをコンテキストに設定
  useEffect(() => {
    console.log(localStorage.getItem("CognitoIdentityServiceProvider.62p2moq06chrr2116tnph73rjl.d784ca58-f091-70d3-b596-8769de44ff30.userData"))

    setGroups(groupData);
  }, [setGroups]);

  return (
    <div className="h-full bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      {/*今後の展望: イベントページを作成し、ジャンプできるようにする*/}
      <HeaderCarousel images={headerImages} />
      {invitedGroupData.length > 0 && (
        <section className="w-full text-[#743E3E] bg-[#FFBC92]">
          <div className="flex items-center p-[14px_0_9px_14px]">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2 flex items-center justify-center text-white text-[10px]">
              新
            </div>
            <p>招待されているグループ一覧</p>
          </div>
          <InvitedGroupList groupData={invitedGroupData} />
        </section>
      )}
      <section className="w-full text-[#743E3E] bg-[#FFBC92]">
        <p className="p-[14px_0_9px_14px]">グループ一覧</p>
        <GroupList groupData={groupData} />
      </section>
      <section className="m-[20px_12px]">
        <CreateGroup />
      </section>
    </div>
  );
}

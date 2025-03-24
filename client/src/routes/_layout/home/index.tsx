import GroupList from "@/components/common/group-list/group-list";
import InvitedGroupList from "@/components/common/group-list/invited-group-list";
import { createFileRoute } from "@tanstack/react-router";
import CreateGroup from "@/features/home/create-group";
import HeaderCarousel from "@/features/home/header-carousel";

export const Route = createFileRoute("/_layout/home/")({
  component: RouteComponent,
});

// TODO: APIでグループ取得
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
  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
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

import GroupList from "@/components/common/group-list/group-list";
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

// ヘッダー画像の配列
const headerImages = [
  "/src/assets/header1.png",
  "/src/assets/header2.png",
  "/src/assets/header3.png",
  "/src/assets/header4.png",
];

function RouteComponent() {
  const { setGroups } = useGroup();

  // コンポーネントマウント時にグループデータをコンテキストに設定
  useEffect(() => {
    setGroups(groupData);
  }, [setGroups]);

  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      <HeaderCarousel images={headerImages} />
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

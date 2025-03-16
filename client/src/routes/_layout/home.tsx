import GroupList from "@/components/common/group-list/group-list";
import { createFileRoute } from "@tanstack/react-router";
import CreateGroup from "@/features/home/create-group";

export const Route = createFileRoute("/_layout/home")({
  component: RouteComponent,
});

//TODO: APIでグループ取得
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

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs">
      <section className="w-full">
        <img
          src="/src/assets/header.png"
          alt="ヘッダー画像"
          className="w-full"
        />
      </section>
      <section className="w-full text-[#743E3E]">
        <p className="p-[14px_0_9px_14px]">グループ一覧</p>
        <GroupList groupData={groupData} />
      </section>
      <section className="m-[20px_12px]">
        <CreateGroup />
      </section>
    </div>
  );
}

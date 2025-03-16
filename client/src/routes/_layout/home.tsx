import GroupList from "@/components/common/group-list/group-list";
import { createFileRoute } from "@tanstack/react-router";

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
      <section className="font-[Inter] flex items-center justify-center bg-[#E8DDDD] flex-col p-[54px_0_14px_0] gap-[39px]">
        <p>イベント開催中</p>
        <button>イベント会場へ</button>
      </section>
      <section className="float-left w-full">
        <p className="p-[14px_0_9px_14px]">グループ一覧</p>
        <GroupList groupData={groupData} />
      </section>
    </div>
  );
}

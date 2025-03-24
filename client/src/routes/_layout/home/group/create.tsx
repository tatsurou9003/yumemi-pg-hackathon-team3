import { Group } from "@/types/groupData";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/home/group/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleSubmit, register } = useForm<Group>();
  const navigate = useNavigate();

  const onSubmit = (data: Group) => {
    //TODO: APIでグループ作成を叩いて、ホーム画面に戻す
    if (data) {
      console.log("フォームデータ: ", data);
      navigate({ to: "/home" });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center ">
        <input
          type="text"
          id="text"
          {...register("groupName", { required: "グループ名" })}
          placeholder="グループ名を入力"
          className="w-[310px] h-[48px] bg-white border border-black rounded px-4 text-black m-[32px_40px_16px_40px] focus:outline-black"
        />
        <button type="submit" className="cursor-pointer">
          作成
        </button>
      </div>
    </form>
  );
}

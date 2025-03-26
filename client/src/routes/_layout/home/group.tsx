import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { getGroups } from "@/hooks/orval/groups/groups";
import { useState } from "react";
import LoadingIndicator from "@/components/common/loading/loading";
import { Group } from "@/types/common";

export const Route = createFileRoute("/_layout/home/group")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleSubmit, register, watch } = useForm<Group>();
  const navigate = useNavigate();
  const groupNameValue = watch("groupName");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: Group) => {
    //TODO: APIでグループ作成を叩いて、ホーム画面に戻す
    if (data) {
      setIsLoading(true);
      try {
        // APIからユーザーホーム情報を取得
        await getGroups().postGroupsCreate(data);
        toast.success("グループを作成しました");
        navigate({ to: "/home" });
      } catch (error) {
        console.log("グループ作成エラー", error);
        toast.error("グループの作成に失敗しました");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#FFEADD] h-full">
      <div className="flex flex-col justify-center items-center ">
        <input
          type="text"
          id="text"
          {...register("groupName", { required: "グループ名" })}
          placeholder="グループ名を入力"
          className="w-[310px] h-[48px] bg-white border border-black outline-none rounded px-4 text-black m-[32px_40px_16px_40px] focus:outline-black"
        />
        <button
          type="submit"
          disabled={!groupNameValue}
          className={`py-2 px-6 rounded-full shadow-md transition-colors ${
            !groupNameValue
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#FF9350] text-white cursor-pointer hover:bg-[#FF7F30]"
          }`}
        >
          作成
        </button>
      </div>
    </form>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { getGroups } from "@/hooks/orval/groups/groups";
import { useState, useRef } from "react";
import LoadingIndicator from "@/components/common/loading/loading";
import { Group } from "@/types/common";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/_layout/home/group")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleSubmit, register, watch } = useForm<Group>();
  const navigate = useNavigate();
  const groupNameValue = watch("groupName");
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: Group) => {
    if (data) {
      setIsLoading(true);
      try {
        // APIからユーザーホーム情報を取得
        await getGroups().postGroupsCreate({
          groupName: data.groupName,
          groupImage: previewImage || undefined,
        });
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

        {/* 画像入力欄の追加 */}
        <div className="w-[310px] mb-6">
          <input
            type="file"
            id="groupImage"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={handleImageClick}
            className="w-full h-12 bg-white border border-black rounded px-4 text-gray-500 
            hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 
            focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
          >
            <Camera size={18} className="text-gray-400" />
            {previewImage
              ? "クリックして画像を変更"
              : "クリックして画像をアップロード"}
          </button>

          {previewImage && (
            <div className="flex justify-center mb-4">
              <img
                src={previewImage}
                alt="グループ画像プレビュー"
                className="h-24 w-24 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
          )}
        </div>

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

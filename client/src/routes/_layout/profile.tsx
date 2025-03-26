import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { User, Camera, Palette } from "lucide-react";

import { getUsers } from "@/hooks/orval/users/users";
import { UserCard } from "@/components/common/user-card/user-card";
import LoadingIndicator from "@/components/common/loading/loading";

type UserProfileData = {
  userId: string;
  userName: string;
  profileImage: string;
  profileColor: string;
};

export const Route = createFileRoute("/_layout/profile")({
  component: ProfileEdit,
});

function ProfileEdit() {
  const { register, handleSubmit, watch, setValue } = useForm<UserProfileData>({
    defaultValues: {
      userId: "",
      userName: "",
      profileImage: "",
      profileColor: "#FF8A65",
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const router = useRouter();
  const { getUsersHome, putUsersProfileUserId } = getUsers();

  const userName = watch("userName") || "お名前";
  const profileColor = watch("profileColor") || "#FF8A65";
  const userId = watch("userId") || "";

  // ユーザー情報の取得
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        const response = await getUsersHome();
        const userData = response.data;

        if (userData) {
          setValue("userId", userData.userId || "");
          setValue("userName", userData.userName || "");
          setValue("profileColor", userData.profileColor || "");
          setValue("profileImage", userData.profileImage || "");
          setPreviewImage(userData.profileImage || "");
        }
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました", error);
        toast.error("ユーザー情報の取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    // eslint-disable-next-line
  }, [setValue]);

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

  const onSubmit = async (data: UserProfileData) => {
    try {
      const formData = {
        userName: data.userName,
        profileImage: previewImage || data.profileImage,
        profileColor: data.profileColor,
      };

      await putUsersProfileUserId(data.userId, formData);

      router.invalidate();
      toast.success("プロフィールを更新しました");
      navigate({
        to: "/home",
      });
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
      toast.error("プロフィール更新に失敗しました");
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="py-8 max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#FF9350] p-6 text-white">
          <h2 className="text-2xl font-bold text-center">プロフィール編集</h2>
          <p className="text-center opacity-80">
            プロフィール情報を更新できます
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="space-y-6">
            <div className="form-group">
              <label
                htmlFor="userName"
                className="text-gray-700 font-semibold mb-2 block"
              >
                アカウント名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="userName"
                  {...register("userName", { required: true })}
                  placeholder="大喜利太郎"
                  className="w-full h-12 bg-white border border-gray-300 rounded-lg pl-10 pr-4 text-gray-500 
                  transition-all focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="profileImage"
                className="text-gray-700 font-semibold mb-2 block"
              >
                プロフィール画像
              </label>
              <input
                type="file"
                id="profileImage"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={handleImageClick}
                className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 text-gray-500 
                hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 
                focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <Camera size={18} className="text-gray-400" />
                {previewImage
                  ? "クリックして画像を変更"
                  : "クリックして画像をアップロード"}
              </button>
            </div>

            <div className="form-group">
              <label
                htmlFor="profileColor"
                className="text-gray-700 font-semibold mb-2 block"
              >
                プロフィールカラー
              </label>
              <div className="relative flex items-center border border-gray-300 rounded-lg p-2 bg-gray-50">
                <Palette size={18} className="text-gray-400 ml-2" />
                <input
                  type="color"
                  id="profileColor"
                  {...register("profileColor")}
                  className="w-full h-8 cursor-pointer ml-2 border-0"
                />
                <span className="ml-2 text-sm text-gray-500">
                  {profileColor}
                </span>
              </div>
            </div>

            <div className="mt-8 mb-8">
              <h4 className="text-gray-700 font-semibold mb-3 text-center">
                プレビュー
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
                <UserCard
                  isPreview={true}
                  name={userName}
                  src={previewImage || "/default-avatar.png"}
                  id={userId}
                  profileColor={profileColor}
                  onSettings={() => {}}
                  onCamera={handleImageClick}
                />
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                className="rounded-[4px] p-[6px_52px] bg-white text-black text-sm font-medium cursor-pointer  "
              >
                編集完了
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

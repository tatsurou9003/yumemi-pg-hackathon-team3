import { useForm } from "react-hook-form";
import { UserData } from "../../../types/userData";
import SignUpSettingButton from "@/components/common/button/sign-up-setting";
import { useState, useRef } from "react";
import { UserCard } from "@/components/common/user-card/user-card";
import { User, Camera, Palette } from "lucide-react";
import { getUsers } from "@/hooks/orval/users/users";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { env } from "../../../env";

const { USER_POOL_CLIENT_ID } = env;

const SettingForm = () => {
  const { handleSubmit, register, watch } = useForm<UserData>({
    defaultValues: {
      userId: "",
      userName: "",
      profileImage: "",
      profileColor: "#FF8A65",
    },
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const router = useRouter();
  const { putUsersProfileUserId } = getUsers();

  const userName = watch("userName") || "お名前";
  const profileColor = watch("profileColor") || "#FF8A65";
  const userId = localStorage.getItem(
    `CognitoIdentityServiceProvider.${USER_POOL_CLIENT_ID}.LastAuthUser`,
  );

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

  const onSubmit = async (data: UserData) => {
    try {
      const formData = {
        userName: data.userName,
        profileImage: previewImage || data.profileImage,
        profileColor: data.profileColor,
      };

      await putUsersProfileUserId(userId || "", {
        userName: formData.userName,
        profileImage: formData.profileImage,
        profileColor: formData.profileColor,
      });

      // ルーターキャッシュを無効化して強制的に再ロードを行う
      router.invalidate();
      toast.success("プロフィール設定に成功しました");
      navigate({
        to: "/home",
      });
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
      toast.error("設定に失敗しました");
    }
  };

  return (
    <div className="py-12 max-w-xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#FF9350] p-6 text-white">
          <h2 className="text-2xl font-bold text-center">プロフィール設定</h2>
          <p className="text-center opacity-80">
            あなたのプロフィールをカスタマイズしましょう
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
                  {...register("userName", { required: "userName" })}
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
                  id="preview-id-123456"
                  profileColor={profileColor}
                  onSettings={() => {}}
                  onCamera={handleImageClick}
                />
              </div>
            </div>

            <div className="pt-4">
              <SignUpSettingButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingForm;

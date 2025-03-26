import { useForm } from "react-hook-form";
import { Amplify, Auth } from "aws-amplify";
import { useNavigate } from "@tanstack/react-router";
import { env } from "@/env";
import { toast } from "react-toastify";

// Amplify の設定（コンポーネント外で実行）
Amplify.configure({
  Auth: {
    region: "ap-northeast-1",
    userPoolId: env.USER_POOL_ID,
    userPoolWebClientId: env.USER_POOL_CLIENT_ID,
  },
});

const VerifyForm = () => {
  const { handleSubmit, register } = useForm<{ code: string }>();
  const navigate = useNavigate();

  // 確認コード検証関数
  async function handleConfirmSignUp(
    email: string,
    code: string,
    password: string
  ) {
    console.log(email, code, password);
    try {
      // 確認コードを検証
      await Auth.confirmSignUp(email, code);
      // 明示的にサインイン
      const user = await Auth.signIn(email, password);
      return user;
    } catch (error) {
      console.error("確認/サインインエラー:", error);
      toast.error("確認コードの検証に失敗しました");
    }
  }

  const onSubmit = async (data: { code: string }) => {
    const email = localStorage.getItem("email") ?? "";
    const password = localStorage.getItem("password") ?? "";

    try {
      await handleConfirmSignUp(email, data.code, password);
      navigate({ to: "/login" });
    } catch (error) {
      console.error("確認エラー:", error);
      toast.error("確認コードの検証に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        id="code"
        {...register("code", { required: "確認コードは必須です" })}
        placeholder="確認コード"
        className="w-[310px] h-[48px] relative top-[74px] bg-white border border-gray-300 rounded px-4 text-gray-500 mb-4 cursor-pointer"
      />
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="relative w-[152px] h-[27px] top-[104px] rounded
                                  bg-white text-black text-sm font-medium cursor-pointer"
        >
          確認
        </button>
      </div>
    </form>
  );
};

export default VerifyForm;

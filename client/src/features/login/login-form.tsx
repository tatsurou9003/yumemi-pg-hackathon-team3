import { useForm } from "react-hook-form";
import { Amplify, Auth } from "aws-amplify";
import { env } from "@/env";
import { formData } from "@/types/formData";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

// Amplify の設定
Amplify.configure({
  Auth: {
    region: "ap-northeast-1",
    userPoolId: env.USER_POOL_ID,
    userPoolWebClientId: env.USER_POOL_CLIENT_ID,
  },
});

const LoginForm = () => {
  // useFormフックの呼び出し
  const { handleSubmit, register } = useForm<formData>();
  const navigate = useNavigate();

  // 認証状態チェック関数
  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await Auth.signIn(email, password);
      return user;
    } catch (error) {
      console.log("認証されていません:", error);
      return null;
    }
  };

  const userId = localStorage.getItem(
    `CognitoIdentityServiceProvider.${env.USER_POOL_CLIENT_ID}.LastAuthUser`,
  );
  const idToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${env.USER_POOL_CLIENT_ID}.${userId}.idToken`,
  );

  const onSubmit = async (data: formData) => {
    try {
      await handleLogin(data.email, data.password);
      try {
        await axios.post(
          `${env.API_URL}/users/first_login_check`,
          {},
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        navigate({ to: "/home" }); // 初回ログインではない (200 OK) 場合の遷移先
      } catch (error: any) {
        console.error(error);
        if (error.response?.status === 404) {
          navigate({ to: "/home/policy" }); // 初回ログイン (404 Not Found) の場合の遷移先
        }
      }
    } catch (error) {
      console.error("サインアップエラー:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center ">
        <input
          type="email"
          id="email"
          {...register("email", { required: "メールアドレス" })}
          placeholder="メールアドレス"
          className="w-[310px] h-[48px] relative top-[74px] bg-white border border-gray-300 rounded px-4 text-gray-500 mb-4 cursor-pointer"
        />
        <input
          type="password"
          id="password"
          {...register("password", { required: "パスワード" })}
          placeholder="パスワード"
          className="w-[310px] h-[48px] relative top-[84px] bg-white border border-gray-300 rounded px-4 text-gray-500 cursor-pointer"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="relative w-[152px] h-[27px]  top-[104px] rounded-[4px] bg-white text-black text-sm font-medium cursor-pointer  "
        >
          ログイン
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

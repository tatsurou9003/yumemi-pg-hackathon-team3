import { useForm } from "react-hook-form";
import { formData } from "@/types/formData";
import { Amplify, Auth } from "aws-amplify";
import { useNavigate } from "@tanstack/react-router";

// Amplify の設定（コンポーネント外で実行）
Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: '',
    userPoolWebClientId: '',
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
      console.log('認証済みユーザー:', user);
      return user;
    } catch (error) {
      console.log('認証されていません');
      return null;
    }
  }

  const onSubmit = async (data: formData) => {
    try {
      await handleLogin(data.email, data.password);
    } catch (error) {
      console.error('サインアップエラー:', error);
      // エラーハンドリング（例：エラーメッセージを表示）
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

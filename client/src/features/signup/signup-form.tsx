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

const SignupForm = () => {
  const { handleSubmit, register } = useForm<formData>();
  const navigate = useNavigate();

  // サインアップ処理を実行する関数
  const handleSignUp = async (email: string, password: string) => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  // フォーム送信時の処理
  const onSubmit = async (data: formData) => {
    try {
      await handleSignUp(data.email, data.password);
      localStorage.setItem('email', data.email);
      localStorage.setItem('password', data.password);
      navigate({ to: "/verify" }); // サインアップ成功時に /complete に遷移
    } catch (error) {
      console.error('サインアップエラー:', error);
      // エラーハンドリング（例：エラーメッセージを表示）
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center">
        <input
          type="email"
          id="email"
          {...register("email", { required: "メールアドレスは必須です" })}
          placeholder="メールアドレス"
          className="w-[310px] h-[48px] relative top-[74px] bg-white border border-gray-300 rounded px-4 text-gray-500 mb-4 cursor-pointer"
        />
        <input
          type="password"
          id="password"
          {...register("password", { required: "パスワードは必須です" })}
          placeholder="パスワード"
          className="w-[310px] h-[48px] relative top-[84px] bg-white border border-gray-300 rounded px-4 text-gray-500 cursor-pointer"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="relative w-[152px] h-[27px] top-[104px] rounded
                   bg-white text-black text-sm font-medium cursor-pointer"
        >
          新規登録
        </button>
      </div>
    </form>
  );
};

export default SignupForm;

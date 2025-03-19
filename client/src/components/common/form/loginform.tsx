import { useForm } from "react-hook-form";
import LoginButton from "../button/login-button";
import { loginData } from "../../../types/loginData";

const LoginForm = () => {
  // useFormフックの呼び出し
  const { handleSubmit, register } = useForm<loginData>();

  const onSubmit = (data: loginData) => {
    console.log("フォームデータ: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="email"
          id="email"
          {...register("email", { required: "メールアドレス" })}
          placeholder="メールアドレス"
          className="position: absolute;width:310px height: 48px;left: 41px;top: 74px;background: #FFFFFF;"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          id="password"
          {...register("password", { required: "パスワード" })}
          placeholder="パスワード"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <LoginButton />
    </form>
  );
};

export default LoginForm;

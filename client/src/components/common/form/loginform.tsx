import { useForm } from "react-hook-form";
import { loginData } from "../../../types/loginData";

const LoginForm = () => {
  // useFormフックの呼び出し
  const { handleSubmit, register } = useForm<loginData>();

  const onSubmit = (data: loginData) => {
    console.log("フォームデータ: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center ">
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
          className="position: absolute;width:310px height: 48px;left: 41px;top: 74px;background: #FFFFFF;"
        />
      </div>
      <div>
        <LoginButton />
      </div>
    </form>
  );
};

export default LoginForm;

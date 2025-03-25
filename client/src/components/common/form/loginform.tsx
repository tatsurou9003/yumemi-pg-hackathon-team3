import { useForm } from "react-hook-form";
import { formData } from "../../../types/formData";

const LoginForm = () => {
  // useFormフックの呼び出し
  const { handleSubmit, register } = useForm<formData>();

  const onSubmit = (data: formData) => {
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
    </form>
  );
};

export default LoginForm;

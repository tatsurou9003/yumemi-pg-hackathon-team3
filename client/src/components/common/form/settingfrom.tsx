import { useForm } from "react-hook-form";
import { UserData } from "../../../types/userData";
import SignUpSettingButton from "@/components/common/button/sign-up-setting";
const SettingForm = () => {
  // useFormフックの呼び出し
  const { handleSubmit, register } = useForm<UserData>();

  const onSubmit = (data: UserData) => {
    console.log("フォームデータ: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center ">
        <label
          htmlFor="email"
          className="text-gray-700 mb-2 text-sm font-medium relative top-[80px] right-[115px] "
        >
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "メールアドレス" })}
          placeholder="sample@sample.com"
          className="w-[310px] h-[48px] relative top-[74px] bg-white border border-gray-300 rounded px-4 text-gray-500 mb-4 cursor-pointer"
        />
        <label
          htmlFor="userId"
          className="text-gray-700 mb-2 text-sm font-medium relative top-[90px] right-[115px]"
        >
          ユーザーID
        </label>
        <input
          type="userId"
          id="userId"
          {...register("userId", { required: "半角英数字8文字以上" })}
          placeholder="半角英数字8文字以上"
          className="w-[310px] h-[48px] relative top-[84px] bg-white border border-gray-300 rounded px-4 text-gray-500 mb-4 cursor-pointer"
        />
        <label
          htmlFor="userId"
          className="text-gray-700 mb-2 text-sm font-medium relative top-[100px] right-[115px]"
        >
          アカウント名
        </label>
        <input
          type="userName"
          id="userName"
          {...register("userName", { required: "userName" })}
          placeholder="大喜利太郎"
          className="w-[310px] h-[48px] relative top-[94px] bg-white border border-gray-300 rounded px-4 text-gray-500 mb-4 cursor-pointer"
        />
        <div className="bottom-10">
          <SignUpSettingButton />
        </div>
      </div>
    </form>
  );
};

export default SettingForm;

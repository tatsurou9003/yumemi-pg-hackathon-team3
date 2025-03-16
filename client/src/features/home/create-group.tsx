import { Plus } from "@/components/common/icon";
import { useNavigate } from "@tanstack/react-router";

const CreateGroup = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        //navigate({ to: "/home/group" });
        navigate({ to: "/profile" });
      }}
      className="cursor-pointer bg-[#FFEADD] text-[#FF6200] font-[Roboto] font-medium flex gap-[6px] items-center rounded-[36px] p-[6px_36px_6px_6px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200"
    >
      <Plus />
      グループを作成する
    </button>
  );
};

export default CreateGroup;

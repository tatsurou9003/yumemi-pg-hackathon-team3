import { ChevronRightBrown } from "@/components/common/icon";
import { SidebarListItemProps } from "@/types/layout";

const SidebarListItem = ({ text, onClick }: SidebarListItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between bg-transparent px-6 py-2 w-full"
    >
      <span className="text-[#743E3E] font-noto text-sm">{text}</span>
      <ChevronRightBrown width="24px" height="24px" />
    </button>
  );
};

export default SidebarListItem;

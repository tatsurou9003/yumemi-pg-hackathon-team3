import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import { Link } from "@tanstack/react-router";
import { Group, GroupData } from "@/types/common";

const GroupList = ({ groupData }: GroupData) => {
  return (
    <div className="flex flex-col bg-[#FFEADD] w-full">
      {groupData.map((group: Group) => (
        <Link
          key={group.groupId}
          to="/home/$groupId"
          params={{ groupId: group.groupId }}
          className="float-left p-[12px] flex items-center gap-[21px] font-[Inter] truncate"
        >
          <Avatar>
            <AvatarImage src={group.groupImage} />
            <AvatarFallback className="bg-white">
              {group.groupName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {group.groupName}({group.memberCount})
        </Link>
      ))}
    </div>
  );
};

export default GroupList;

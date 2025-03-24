import { Group, GroupData } from "@/types/groupData";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import { Link } from "@tanstack/react-router";
import { useGroup } from "@/hooks/useGroup";

const GroupList = ({ groupData }: GroupData) => {
  const { setCurrentGroupById } = useGroup();

  return (
    <div className="flex flex-col bg-[#FFEADD] w-full">
      {groupData.map((group: Group) => (
        <Link
          key={group.groupId}
          //to={`/home/${group.groupId}`}
          to="/profile" //暫定的に
          onClick={() => setCurrentGroupById(group.groupId)}
          className="float-left p-[12px] flex items-center gap-[21px] font-[Inter] truncate"
        >
          <Avatar>
            <AvatarImage src={group.groupImage} />
            <AvatarFallback className="bg-white">
              {group.groupName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {group.groupName}({group.count})
        </Link>
      ))}
    </div>
  );
};

export default GroupList;

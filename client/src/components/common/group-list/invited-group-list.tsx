import { useState } from "react";
import { Group, GroupData } from "@/types/groupData";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import InviteModal from "./invite-modal";

const InvitedGroupList = ({ groupData }: GroupData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
  };

  //TODO: 参加するって言ったらグループ一覧に追加する

  return (
    <div className="flex flex-col bg-[#FFEADD] w-full">
      {groupData.map((group: Group) => (
        <button
          key={group.groupId}
          onClick={() => handleGroupClick(group)}
          className="cursor-pointer float-left p-[12px] flex items-center gap-[21px] font-[Inter] truncate text-left"
        >
          <Avatar>
            <AvatarImage src={group.groupImage} />
            <AvatarFallback className="bg-white">
              {group.groupName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {group.groupName}({group.memberCount})
        </button>
      ))}
      {isModalOpen && selectedGroup && (
        <InviteModal
          group={selectedGroup}
          onClose={handleCloseModal}
          onAccept={() => {
            console.log(`Accepted invitation to ${selectedGroup.groupName}`);
            handleCloseModal();
          }}
          onDecline={() => {
            console.log(`Declined invitation to ${selectedGroup.groupName}`);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default InvitedGroupList;

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/avatar";
import InviteModal from "./invite-modal";
import { Group, GroupData } from "@/types/common";
import { toast } from "react-toastify";

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

  const handleAccept = () => {
    if (selectedGroup) {
      toast.success(`${selectedGroup.groupName}に参加しました`);
      handleCloseModal();
      window.location.reload();
    }
  };

  const handleDecline = () => {
    if (selectedGroup) {
      toast.info(`${selectedGroup.groupName}への招待を拒否しました`);
      handleCloseModal();
      window.location.reload();
    }
  };

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
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </div>
  );
};

export default InvitedGroupList;

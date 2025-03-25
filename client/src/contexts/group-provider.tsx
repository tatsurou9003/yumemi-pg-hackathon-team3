import { useState, ReactNode } from "react";
import { GroupContext } from "./group-context";
import { Group } from "@/types/common";

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);

  const setCurrentGroupById = (groupId: string) => {
    const group = groups.find((g) => g.groupId === groupId);
    setCurrentGroup(group || null);
  };

  const getGroupNameById = (groupId: string) => {
    const group = groups.find((g) => g.groupId === groupId);
    return group ? group.groupName : "不明なグループ";
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        currentGroup,
        setGroups,
        setCurrentGroupById,
        getGroupNameById,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

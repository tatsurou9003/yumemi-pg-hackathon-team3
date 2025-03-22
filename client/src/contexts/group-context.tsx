import { createContext } from "react";
import { Group } from "@/types/groupData";

interface GroupContextType {
  groups: Group[];
  currentGroup: Group | null;
  setGroups: (groups: Group[]) => void;
  setCurrentGroupById: (groupId: string) => void;
  getGroupNameById: (groupId: string) => string;
}

export const GroupContext = createContext<GroupContextType | undefined>(
  undefined
);

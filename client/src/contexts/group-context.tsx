import { Group } from "@/types/common";
import { createContext } from "react";

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

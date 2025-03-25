import { GroupContext } from "@/contexts/group-context";
import { useContext } from "react";

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};

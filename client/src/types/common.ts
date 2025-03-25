export type Group = {
  groupName: string;
  memberCount: number;
  groupImage: string;
  groupId: string;
};

export type GroupData = {
  groupData: Group[];
};

export interface InviteModalProps {
  group: Group;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export interface LoadingIndicatorProps {
  message?: string;
}

export interface UserCardProps {
  name: string;
  src: string;
  id: string;
  onSettings: () => void;
  onCamera: () => void;
}

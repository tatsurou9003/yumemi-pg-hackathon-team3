export interface LayoutProps {
  version: string;
  avatar: string;
  children: React.ReactNode;
  onLogout: () => void;
}

export interface HeaderProps {
  avatar: string;
  onSidebar: () => void;
}

export interface HomeAvatarProps {
  isPreview: boolean;
  src: string;
  userName?: string;
  userId?: string;
  profileColor?: string;
}

export interface SidebarProps {
  version: string;
  onLogout: () => void;
}

export interface SidebarListItemProps {
  text: string;
  onClick: () => void;
}

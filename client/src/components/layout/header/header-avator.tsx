import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";

interface AvatarProps {
  src: string;
  onClick: () => void;
}

export const HeaderAvatar: React.FC<AvatarProps> = ({ src, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ border: "none", background: "transparent" }}
    >
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </button>
  );
};

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";

interface AvatarProps {
  src: string;
  onClick: () => void;
}

const HeaderAvatar = ({ src, onClick }: AvatarProps) => {
  return (
    <button onClick={onClick} className="border-none bg-transparent">
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </button>
  );
};

export { HeaderAvatar };

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";
import { UserCard } from "@/components/common/user-card/user-card";

interface AvatarProps {
  src: string;
}

const HeaderAvatar = ({ src }: AvatarProps) => {
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const toggleUserCard = () => {
    setIsUserCardOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleUserCard} className="border-none bg-transparent">
        <Avatar>
          <AvatarImage src={src} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </button>
      <div
        className={`absolute top-[calc(100%_+_3px)] right-0 z-10 transition-opacity duration-200 ${
          isUserCardOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <UserCard
          name="John Doe"
          src={src}
          id="12345"
          onSettings={() => console.log("Settings clicked")}
          onCamera={() => console.log("Camera clicked")}
        />
      </div>
    </div>
  );
};

export { HeaderAvatar };

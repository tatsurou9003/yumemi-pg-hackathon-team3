import { useState, useEffect, useRef, useCallback } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar/avatar";
import { UserCard } from "@/components/common/user-card/user-card";
import { HomeAvatarProps } from "@/types/layout";

const HomeAvatar = ({
  isPreview,
  src,
  userName,
  profileColor,
  userId,
}: HomeAvatarProps) => {
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(src);
  const userCardRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setAvatarSrc(src);
  }, [src]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      userCardRef.current &&
      avatarRef.current &&
      !userCardRef.current.contains(event.target as Node) &&
      !avatarRef.current.contains(event.target as Node)
    ) {
      setIsUserCardOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleUserCard = () => {
    setIsUserCardOpen((prev) => !prev);
  };

  const handleImageUpdate = (newImageSrc: string) => {
    setAvatarSrc(newImageSrc);
  };

  // ユーザー名の先頭文字を取得（空の場合は'U'をデフォルト値とする）
  const userInitial = userName && userName.length > 0 ? userName.charAt(0) : "";

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleUserCard}
        ref={avatarRef}
        className="border-none bg-transparent cursor-pointer"
      >
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
      </button>
      {isUserCardOpen && (
        <div
          ref={userCardRef}
          className="absolute top-[calc(100%_+_3px)] right-0 z-10 transition-opacity duration-200"
        >
          <UserCard
            isPreview={isPreview}
            name={userName || ""}
            src={avatarSrc}
            id={userId || ""}
            profileColor={profileColor || ""}
            onImageUpdate={handleImageUpdate}
          />
        </div>
      )}
    </div>
  );
};

export { HomeAvatar };

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import RoomForm from "./room-form";
import {
  Add,
  Album,
  Clear,
  CreateOogiri,
  PhotoCamera,
} from "@/components/common/icon";

// form完成後付けたし

const RoomFooter = () => {
  const navigate = useNavigate();
  const [isCreateOogiriOpen, setCreateOogiriOpen] = useState<boolean>(false);
  const toggleCreateOogiri = () => {
    setCreateOogiriOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full h-auto items-center bg-[#FFF]">
      <div className="flex w-full h-[48px] px-3 py-1 items-center gap-3 flex-shrink-0">
        {isCreateOogiriOpen ? (
          <Clear width="24px" height="24px" onClick={toggleCreateOogiri} />
        ) : (
          <Add
            width="24px"
            height="24px"
            className="cursor-pointer"
            onClick={toggleCreateOogiri}
          />
        )}
        <PhotoCamera
          width="24px"
          height="24px"
          className="cursor-pointer"
          onClick={() => {
            navigate({ to: "/home" });
          }}
        />
        <Album
          width="24px"
          height="24px"
          className="cursor-pointer"
          onClick={() => {
            navigate({ to: "/home" });
          }}
        />
        <RoomForm />
      </div>
      {isCreateOogiriOpen && (
        <div className="flex flex-col w-full px-[78px] py-[18px] items-center bg-[#FFF7E4]">
          <CreateOogiri
            width="237px"
            height="113.8px"
            className="cursor-pointer"
            onClick={() => {
              navigate({ to: "/home" });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RoomFooter;

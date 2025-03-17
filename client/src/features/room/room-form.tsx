import { useState } from "react";
import {
  Add,
  Album,
  Clear,
  CreateOogiri,
  PhotoCamera,
} from "@/components/common/icon";

const RoomForm = () => {
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
          <Add width="24px" height="24px" onClick={toggleCreateOogiri} />
        )}
        <PhotoCamera width="24px" height="24px" />
        <Album width="24px" height="24px" />
        <form />
      </div>
      {isCreateOogiriOpen && (
        <div className="flex flex-col w-full px-[78px] py-[18px] items-center">
          <CreateOogiri width="237px" height="113.8px" />
        </div>
      )}
    </div>
  );
};

export default RoomForm;

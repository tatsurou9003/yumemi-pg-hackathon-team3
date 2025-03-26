import { useState } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import RoomForm, { FormSchema } from "./room-form";
import {
  Add,
  Album,
  Clear,
  CreateOogiri,
} from "@/components/common/icon";

type RoomFooterProps = {
  onSend: (data: FormSchema) => void;
  onImg: (file: File) => void;
};

const RoomFooter = ({ onSend, onImg }: RoomFooterProps) => {
  const location = useLocation();
  const path = location.pathname ?? "";
  const groupId = path.split("/")[2];
  const navigate = useNavigate();

  const [isCreateOogiriOpen, setCreateOogiriOpen] = useState<boolean>(false);
  const toggleCreateOogiri = () => {
    setCreateOogiriOpen((prev) => !prev);
  };

  const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      onImg(file);
    }
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
        <Album
          width="24px"
          height="24px"
          className="cursor-pointer"
          onClick={() => {
            // 画像選択ダイアログを開く
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.onchange = handleFileSelect;
            fileInput.click();
          }}
        />
        <RoomForm onSend={onSend} />
      </div>
      {isCreateOogiriOpen && (
        <div className="flex flex-col w-full px-[78px] py-[18px] items-center bg-[#FFF7E4]">
          <CreateOogiri
            width="237px"
            height="113.8px"
            className="cursor-pointer"
            onClick={() => {
              navigate({ to: `/home/${groupId}/post` });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RoomFooter;

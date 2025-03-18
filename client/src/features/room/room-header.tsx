interface RoomHeaderProps {
  title: string;
}

const RoomHeader = ({ title }: RoomHeaderProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-[#743E3E] text-base font-normal leading-7 bg-[#FFF]">
        {title}
      </div>
      <span className="w-[108px] border-t-2 border-[#743E3E]" />
    </div>
  );
};

export default RoomHeader;

interface RoomHeaderProps {
  title: string;
}

const RoomHeader = ({ title }: RoomHeaderProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <span className="w-full h-[54px] text-[#743E3E] text-base leading-7 bg-[#FFF] flex items-center justify-center">
        {title}
      </span>
      <hr className="w-[108px] border-t-2 border-[#743E3E]" />
    </div>
  );
};

export default RoomHeader;


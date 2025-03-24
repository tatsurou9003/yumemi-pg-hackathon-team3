type OogiriProps = {
  text?: string;
  image?: string;
  isDead: boolean;
};

const Oogiri = ({ text, image, isDead }: OogiriProps) => {
  return (
    <div
      className={`w-full rounded p-4 w-auto box-shadow[0px 4px 4px 0px rgba(0, 0, 0, 0.25)] ${isDead ? "bg-[#FFE735]" : "bg-[#FFB8BA]"}`}
    >
      {image && !text ? (
        <img
          src={image}
          alt="OogiriMessage image"
          className="rounded w-[168px] h-auto"
        />
      ) : null}
      {text && (
        <div className="flex flex-col justify-center items-start gap-2.5 self-stretch p-[2px_12px_6px_12px]">
          <span className="text-[#743E3E] text-[12px] leading-[20px]">
            【大喜利】
            <br />
            {text}
          </span>
          {image && (
            <img
              src={image}
              alt="OogiriMessage image"
              className="w-[168px] h-auto"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Oogiri;

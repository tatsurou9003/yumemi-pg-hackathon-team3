import { createFileRoute } from "@tanstack/react-router";
import SvgSmile from "@/components/common/icon/smile";
import SvgTitle from "@/components/common/icon/title";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#FF9350]">
      <SvgSmile className="w-[393px] h-[852px] flex-none order-1 flex-grow-0 " />
      <SvgTitle className="w-[340px] h-[85px] flex-none order-0 mt-20 " />
    </div>
  );
}

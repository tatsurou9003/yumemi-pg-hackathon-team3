import { createFileRoute } from "@tanstack/react-router";
import SettingForm from "@/components/common/form/settingform";

export const Route = createFileRoute("/_layout/setting")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs bg-contain bg-center ">
      <SettingForm />
    </div>
  );
}

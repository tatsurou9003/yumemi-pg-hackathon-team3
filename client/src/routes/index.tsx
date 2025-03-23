import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <div className="min-h-screen bg-[#FFBC92] text-xs">タイトル画面</div>;
}

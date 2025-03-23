import { createFileRoute } from "@tanstack/react-router";
import SvgSmile from "@/components/common/icon/smile";
import SvgTitle from "@/components/common/icon/title";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // スプラッシュ画面表示後の遅延時間（ミリ秒）
    const delay = 3000;
    // フェードアウト開始までの時間
    const fadeOutStart = delay - 500;

    // フェードアウトのタイマー
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, fadeOutStart);

    // 画面遷移のタイマー
    const navigationTimer = setTimeout(() => {
      navigate({ to: "/login" });
    }, delay);

    return () => {
      clearTimeout(navigationTimer);
      clearTimeout(fadeTimer);
    };
  }, [navigate]);
  return (
    <div className={`flex flex-col justify-center items-center min-h-screen bg-[#FF9350] transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
      <SvgSmile className="w-[393px] h-[852px] flex-none order-1 flex-grow-0 " />
      <SvgTitle className="w-[340px] h-[85px] flex-none order-0 mt-20 " />
    </div>
  );
}

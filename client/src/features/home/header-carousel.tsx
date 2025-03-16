import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "@/components/common/icon";

type HeaderCarouselProps = {
  images: string[]; // 画像パスの配列
};

const HeaderCarousel = ({ images }: HeaderCarouselProps) => {
  // 実際のイメージ数
  const REAL_COUNT = images.length;
  // 前後にコピーする数
  const COPY_COUNT = 2;

  // 拡張された画像配列を作成（前後にコピー追加）
  const extendedImages = [
    ...images.slice(REAL_COUNT - COPY_COUNT),
    ...images,
    ...images.slice(0, COPY_COUNT),
  ];

  const [currentIndex, setCurrentIndex] = useState(COPY_COUNT); // 初期位置は実画像の先頭
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // カルーセルのスタイル
  const carouselStyle = {
    transition: isTransitioning ? "transform 500ms ease" : "none",
    transform: `translateX(-${(currentIndex * 100) / extendedImages.length}%)`,
    width: `${extendedImages.length * 100}%`,
    display: "flex",
  };

  // 位置調整関数
  const adjustPosition = () => {
    setIsTransitioning(false);

    // 先頭のコピーまで来た場合、本来の先頭へ
    if (currentIndex >= REAL_COUNT + COPY_COUNT) {
      setCurrentIndex(COPY_COUNT);
    }
    // 末尾のコピーまで来た場合、本来の末尾へ
    else if (currentIndex < COPY_COUNT) {
      setCurrentIndex(REAL_COUNT + COPY_COUNT - 1);
    }
  };

  // トランジション完了時のハンドラー
  const handleTransitionEnd = () => {
    adjustPosition();
  };

  // 次の画像へ
  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // 前の画像へ
  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <section className="w-full flex justify-center items-center py-4">
      <ChevronLeft
        onClick={prevImage}
        className="w-[40px] h-[40px] md:w-[56px] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      />
      <div className="relative overflow-hidden w-[70%] max-w-[400px]">
        {/* 左側の影オーバーレイ */}
        <div className="absolute inset-y-0 left-0 w-[10px] z-1 pointer-events-none bg-gradient-to-r from-[rgba(0,0,0,0.2)] to-transparent"></div>

        <div
          ref={carouselRef}
          style={carouselStyle as React.CSSProperties}
          onTransitionEnd={handleTransitionEnd}
          className="h-full"
        >
          {extendedImages.map((src, idx) => (
            <div
              key={`carousel-${idx}`}
              className="flex-shrink-0"
              style={{ width: `${100 / extendedImages.length}%` }}
            >
              <img
                src={src}
                alt={`ヘッダー画像 ${idx}`}
                className="w-full h-auto object-contain shadow-md transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* 右側の影オーバーレイ */}
        <div className="absolute inset-y-0 right-0 w-[10px] pointer-events-none bg-gradient-to-l from-[rgba(0,0,0,0.2)] to-transparent"></div>
      </div>
      <ChevronRight
        onClick={nextImage}
        className="w-[40px] h-[40px] md:w-[56px] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      />
    </section>
  );
};

export default HeaderCarousel;

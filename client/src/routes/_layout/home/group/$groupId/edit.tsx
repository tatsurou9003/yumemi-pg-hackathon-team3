import { createFileRoute } from "@tanstack/react-router";
import { User } from "@/types/userData";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_layout/home/group/$groupId/edit")({
  component: RouteComponent,
});
// TODO: ルーム画面のアイコンからここに飛べるようにする

const mockUsers: User[] = [
  {
    userId: "u001",
    userName: "田中太郎",
    profileImage: "",
    profileColor: "#FFB6C1",
  },
  {
    userId: "u002",
    userName: "鈴木花子",
    profileImage: "",
    profileColor: "#ADD8E6",
  },
  {
    userId: "u003",
    userName: "山田勇気",
    profileImage: "",
    profileColor: "#90EE90",
  },
  {
    userId: "u004",
    userName: "佐藤めぐみ",
    profileImage: "",
    profileColor: "#FFFFE0",
  },
  {
    userId: "u005",
    userName: "中村拓也",
    profileImage: "",
    profileColor: "#E6E6FA",
  },
  {
    userId: "u006",
    userName: "エンジニア太郎",
    profileImage: "",
    profileColor: "#FFA07A",
  },
  {
    userId: "u007",
    userName: "デザイナー花子",
    profileImage: "",
    profileColor: "#87CEFA",
  },
];

function RouteComponent() {
  const { handleSubmit, register, watch } = useForm<User>();
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const searchTerm = watch("userId") || "";

  const handleSearch = () => {
    // 検索語が空の場合は結果をクリア
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = mockUsers.filter(
      (user) =>
        user.userId.toLowerCase().includes(term) ||
        user.userName.toLowerCase().includes(term)
    );
    setSearchResults(results);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  // 選択されたユーザーオブジェクトの取得
  const getSelectedUserObjects = () => {
    return selectedUsers
      .map((id) => mockUsers.find((user) => user.userId === id))
      .filter(Boolean) as User[];
  };

  const onSubmit = () => {
    //TODO: APIでメンバー招待を叩いて、ルーム画面に戻す
    console.log("選択されたユーザー: ", selectedUsers);
  };

  // スクロール処理
  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 50; // スクロール量
    const container = scrollContainerRef.current;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[310px] m-[32px_40px_16px_40px]">
          <input
            type="text"
            id="text"
            {...register("userId")}
            placeholder="ユーザーIDを検索"
            className="w-full h-[48px] bg-[#D9D9D9] rounded px-4 pr-12 text-[#A2A2A2]"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A2A2A2] cursor-pointer"
            onClick={handleSearch}
          >
            <Search />
          </button>
        </div>

        {/* 選択済みユーザーのアイコン表示 */}
        {selectedUsers.length > 0 && (
          <div className="w-[310px] mb-4 relative">
            {/* スクロールボタン - 左 */}
            {selectedUsers.length > 5 && (
              <button
                type="button"
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {/* スクロール可能なコンテナ */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide gap-2 py-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {getSelectedUserObjects().map((user) => (
                <div key={user.userId} className="relative flex-shrink-0">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.userName}
                      className="w-13 h-13 rounded-full"
                    />
                  ) : (
                    <div
                      className="w-13 h-13 rounded-full flex items-center justify-center text-white text-lg font-medium"
                      style={{ backgroundColor: user.profileColor }}
                    >
                      {user.userName.charAt(0)}
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-0.5 cursor-pointer hover:bg-gray-300"
                    onClick={() => removeSelectedUser(user.userId)}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* スクロールボタン - 右 */}
            {selectedUsers.length > 5 && (
              <button
                type="button"
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="w-[310px] mb-4">
            <ul className="bg-white rounded-md shadow-sm overflow-hidden">
              {searchResults.map((user) => (
                <li
                  key={user.userId}
                  className="flex items-center p-3 border-b border-gray-100 last:border-b-0"
                >
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.userName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-medium"
                      style={{ backgroundColor: user.profileColor }}
                    >
                      {user.userName.charAt(0)}
                    </div>
                  )}

                  <span className="flex-grow ml-3">{user.userName}</span>

                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      selectedUsers.includes(user.userId)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => toggleUserSelection(user.userId)}
                  >
                    {selectedUsers.includes(user.userId) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={selectedUsers.length === 0}
          className={`py-2 px-6 rounded-full shadow-md transition-colors ${
            selectedUsers.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#FF9350] text-white cursor-pointer hover:bg-[#FF7F30]"
          }`}
        >
          招待
        </button>
      </div>
    </form>
  );
}

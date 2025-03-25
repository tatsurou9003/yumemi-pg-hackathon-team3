import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { User } from "@/types/userData";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { getUsers } from "@/hooks/orval/users/users";
import LoadingIndicator from "@/components/common/loading/loading";
import { getGroups } from "@/hooks/orval/groups/groups";

export const Route = createFileRoute("/_layout/home/$groupId/edit")({
  component: RouteComponent,
});
// TODO: ルーム画面のアイコンからここに飛べるようにする

function RouteComponent() {
  const { handleSubmit, register, watch } = useForm<User>();
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams({ from: "/_layout/home/$groupId/edit" });

  const searchTerm = watch("userId") || "";

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers().getUsersSearch({
        userId: searchTerm,
      });

      if (response.data) {
        const userData: User = {
          userId: response.data.userId,
          userName: response.data.userName,
          profileImage: response.data.profileImage || "",
          profileColor: response.data.profileColor || "#CCCCCC",
        };

        setSearchResults([userData]);
      } else {
        setSearchResults([]);
        toast.info("ユーザーが見つかりませんでした");
      }
    } catch (error) {
      console.error("ユーザー検索エラー:", error);
      toast.error("ユーザー検索中にエラーが発生しました");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
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
      .map((id) => searchResults.find((user) => user.userId === id))
      .filter(Boolean) as User[];
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await getGroups().postGroupsInviteGroupId(params.groupId, {
        userIds: selectedUsers,
      });

      toast.success("メンバーを招待しました");

      navigate({ to: `/home` });
    } catch (error) {
      console.error("メンバー招待エラー:", error);
      toast.error("メンバーの招待に失敗しました");
    } finally {
      setIsLoading(false);
    }
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

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#FFEADD] h-full">
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-[310px] m-[32px_40px_16px_40px]">
          <input
            type="text"
            id="text"
            {...register("userId")}
            placeholder="ユーザーIDを検索"
            className="w-full h-[48px] bg-white rounded px-4 pr-12 text-black border border-black outline-none"
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
                    className="absolute -top-1 -right-1 bg-gray-300 rounded-full p-0.5 cursor-pointer hover:bg-gray-400"
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

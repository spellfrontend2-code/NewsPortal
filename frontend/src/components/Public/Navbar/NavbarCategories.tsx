import { useAuthStore } from "@/context/useAuthStore";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { ArticleRectangleCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import UserLogin from "@/features/auth/components/UserLogin";
import { useAuthHooks } from "@/features/auth/hooks/useAuth";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { useProfileHooks } from "@/features/profile/hooks/useProfile";
import { useDebounce } from "@/lib/useDebounce";
import { LogOut, Search, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

function NavbarCategories() {
  const { setAuthData } = useAuthStore();
  const [search, setSearch] = useState("");
  const authHook = useAuthHooks();
  const { data: profile, isLoading: profileLoading } =
    authHook.useFetchProfile();
  const profileData = profile?.data ?? [];
  const categoryHook = useCategoriesHooks();
  const [loginOpen, setLoginOpen] = useState(false);
  const {
    data: CategoryList,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = categoryHook.useFetchPublicCategories({ page: 1, per_page: 5 });
  const categories = CategoryList?.data ?? [];
  const [profileInfoOpen, setProfileInfoOpen] = useState(false);
  const updatedCategories = [{ id: 0, name: "Home", slug: "" }, ...categories];
  const debouncedSearch = useDebounce(search, 1000);
  const articleHook = useArticlesHooks();
  const {
    data: searchedArticlesData,
    isLoading: searchLoading,
    isError: searchError,
  } = articleHook.useSearchPublicArticles({
    page: 1,
    per_page: 5,
    search: debouncedSearch,
  });
  const searchedArticles = searchedArticlesData?.data ?? [];
  const [searchOpen, setSearchOpen] = useState(false);
  const logout = authHook.useLogout();
  const handleLogout = () => {
    logout.mutate(
      undefined,
      {
        onSuccess: (res) => {
          setAuthData({});
          toast.success(res?.message || "Logged out successfully");
        },
      },
    );
  };
  useEffect(() => {
    if (search.trim()) {
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }
  }, [search]);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearch("");
        setSearchOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex w-full items-center justify-center bg-[var(--color-public-primary)]">
      <div className="flex h-[50px] w-[80%] justify-between">
        <div className="flex w-[70%]  justify-between">
          {updatedCategories.map((category) => (
            <NavLink
              key={category.id}
              to={
                category.slug === ""
                  ? "/"
                  : `/news-list/category/${category.slug}`
              }
              className={({ isActive }) =>
                `inline-block p-3 font-semibold uppercase transition-colors ${
                  isActive
                    ? "text-[var(--color-public-navtext)]"
                    : "text-[rgb(var(--color-public-navtext-rgb)/0.8)]"
                } hover:text-[var(--color-public-navtext)]`
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>

        <div className="relative flex h-full w-[30%] items-center justify-end gap-3 rounded-xl">
          <div
            ref={searchRef}
            className="flex h-[60%] items-center gap-2 rounded-2xl border-2 border-[var(--color-secondary)] p-2 overflow-hidden"
          >
            <Search
              size={18}
              strokeWidth={2}
              color="var(--color-public-navtext)"
            />

            <input
              className="border-none bg-[var(--color-public-primary)] text-[var(--color-public-navtext)] outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            {searchOpen && debouncedSearch && (
              <div className="absolute z-50 left-35 flex flex-col  top-10 max-h-60 w-full bg-white shadow-lg rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
                {searchLoading ? (
                  <>
                    <ArticleRectangleCardSkeleton />
                    <ArticleRectangleCardSkeleton />
                    <ArticleRectangleCardSkeleton />
                  </>
                ) : searchedArticles && searchedArticles.length > 0 ? (
                  searchedArticles.map((article) => (
                    <div
                      key={article?.data?.id}
                      className="h-full w-full cursor-pointer"
                      onClick={() => {
                        setSearch("");
                        setSearchOpen(false);
                      }}
                    >
                      <ArticleRectangleCard article={article?.data} type="" />
                      <hr className="border-[var(--color-secondary)]" />
                    </div>
                  ))
                ) : (
                  <p className="text-black p-3">No Articles Found</p>
                )}
              </div>
            )}
          </div>

          <div>
            {profileData.id ? (
              <div
                className="relative h-8 w-8 rounded-full bg-[rgb(var(--color-public-navtext-rgb)/0.3)] border border-[var(--color-public-navtext)]
           flex justify-center items-center font-bold text-xl text-[var(--color-public-navtext)] cursor-pointer"
                onClick={() => {
                  setProfileInfoOpen(!profileInfoOpen);
                }}
              >
                {profileData?.name?.charAt(0)}
                {profileInfoOpen && (
                  <div
                    ref={profileRef}
                    className="absolute rounded-lg z-50 shadow-xl top-8 -left-5 w-[200px] h-[100px] flex flex-col gap-2 bg-[var(--color-public-bg)] text-[var(--color-public-newsText)]  "
                  >
                    <div className="flex flex-col px-3 pt-1">
                      <p className="text-base font-bold">{profileData?.name}</p>
                      <p className="text-sm text-gray-400 font-normal">
                        {profileData?.email}
                      </p>
                    </div>
                    <div
                      onClick={handleLogout}
                      className=" flex h-full w-full cursor-pointer items-center gap-2 rounded-b-lg border-t border-[rgb(var(--color-public-newsText-rgb)/0.3)] px-3 text-base text-red-500 hover:bg-red-100"
                    >
  <LogOut size={20} />
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <UserCircle
                color="white"
                size={30}
                className="cursor-pointer"
                onClick={() => {
                  setLoginOpen(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <UserLogin open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}

export default NavbarCategories;

import { useAuthStore } from "@/context/useAuthStore";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { ArticleRectangleCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import UserLogin from "@/features/auth/components/UserLogin";
import { useAuthHooks } from "@/features/auth/hooks/useAuth";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { useDebounce } from "@/lib/useDebounce";
import { ChevronDown, LogOut, Menu, Search, UserCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

function NavbarCategories() {
  const { setAuthData } = useAuthStore();
  const [search, setSearch] = useState("");
  const authHook = useAuthHooks();
  const { data: profile } = authHook.useFetchProfile();
  const profileData = profile?.data ?? [];
  const categoryHook = useCategoriesHooks();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: CategoryList } = categoryHook.useFetchPublicCategories({
    page: 1,
    per_page: 5,
  });
  const categories = CategoryList?.data ?? [];
  const [profileInfoOpen, setProfileInfoOpen] = useState(false);
  const updatedCategories =
    categories.length > 0
      ? [{ id: 0, name: "Home", slug: "" }, ...categories]
      : [{ id: 0, name: "Home", slug: "" }];

  const debouncedSearch = useDebounce(search, 1000);
  const articleHook = useArticlesHooks();
  const { data: searchedArticlesData, isLoading: searchLoading } =
    articleHook.useSearchPublicArticles({
      page: 1,
      per_page: 5,
      search: debouncedSearch,
    });
  const searchedArticles = searchedArticlesData?.data ?? [];
  const [searchOpen, setSearchOpen] = useState(false);
  const logout = authHook.useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: (res) => {
        setAuthData({});
        toast.success(res?.message || "Logged out successfully");
      },
    });
  };

  useEffect(() => {
    setSearchOpen(!!search.trim());
  }, [search]);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center h-full px-3 lg:px-4 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2 hover:text-white whitespace-nowrap ${
      isActive
        ? "text-white border-indigo-500 bg-white/5"
        : "text-slate-400 border-transparent hover:bg-white/5"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-l-4 ${
      isActive
        ? "text-white border-indigo-500 bg-white/10"
        : "text-slate-300 border-transparent hover:text-white hover:bg-white/5"
    }`;
const [openCategory, setOpenCategory] = useState<number | null>(null);
  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-800 sticky top-0 z-50">
      {/* ── Main bar ── */}
      <div className="flex h-[54px] w-[70%] max-w-screen-xl mx-auto items-center justify-between px-4 md:px-8">

        {/* Desktop: category links */}
        <div className="hidden md:flex items-center h-full overflow-x-auto scrollbar-none">
         {updatedCategories.map((category) => (
  <div key={category.id} className="relative">
    <div className="flex items-center">
      <NavLink
        to={category.slug === "" ? "/" : `/news-list/category/${category.slug}`}
        className={navLinkClass}
      >
        {category.name}
      </NavLink>

      {category.children?.length > 0 && (
        <button
          onClick={() =>
            setOpenCategory(
              openCategory === category.id ? null : category.id
            )
          }
          className="p-1 text-slate-400 hover:text-white"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${
              openCategory === category.id ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>

    {openCategory === category.id && (
      <div className="absolute left-0 mt-2 w-52 rounded-md bg-white shadow-lg z-50">
        {category.children.map((child: any) => (
          <NavLink
            key={child.id}
            to={`/news-list/category/${child.slug}`}
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            {child.name}
          </NavLink>
        ))}
      </div>
    )}
  </div>
))}
        </div>

        {/* Mobile: hamburger toggle */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Right side: search + profile (always visible) */}
        <div className="relative flex items-center justify-end gap-3 h-full">
          {/* Search */}
          <div
            ref={searchRef}
            className="relative flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 transition-all duration-300 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 group"
          >
            <Search
              size={14}
              className="text-slate-400 group-focus-within:text-slate-900 transition-colors shrink-0"
            />
            <input
              className="border-none bg-transparent text-xs text-white outline-none w-24 sm:w-36 focus:w-40 sm:focus:w-48 focus:text-slate-900 transition-all duration-300 placeholder-slate-500"
              placeholder="Search news..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            {/* Search results dropdown */}
            {searchOpen && debouncedSearch && (
              <div className="absolute z-50 right-0 top-11 max-h-72 w-[300px] sm:w-[320px] bg-white border border-slate-100 shadow-xl rounded-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 p-2 flex flex-col gap-1.5">
                {searchLoading ? (
                  <>
                    <ArticleRectangleCardSkeleton />
                    <ArticleRectangleCardSkeleton />
                  </>
                ) : searchedArticles && searchedArticles.length > 0 ? (
                  searchedArticles.map((article) => (
                    <div
                      key={article?.data?.id}
                      className="w-full cursor-pointer hover:bg-slate-50 rounded-xl overflow-hidden p-1 transition-colors"
                      onClick={() => {
                        setSearch("");
                        setSearchOpen(false);
                      }}
                    >
                      <ArticleRectangleCard article={article?.data} type="" />
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-xs p-3 text-center">
                    No articles found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Profile / Login */}
          <div className="flex items-center">
            {profileData.id ? (
              <div className="relative" ref={profileRef}>
                <button
                  className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 border border-indigo-400/20 flex justify-center items-center font-bold text-xs text-white cursor-pointer shadow-sm transition-all"
                  onClick={() => setProfileInfoOpen(!profileInfoOpen)}
                >
                  {profileData?.name?.charAt(0).toUpperCase()}
                </button>
                {profileInfoOpen && (
                  <div className="absolute right-0 mt-2.5 rounded-2xl z-50 shadow-2xl w-[240px] bg-white border border-slate-100 p-1 text-slate-800 flex flex-col gap-1">
                    <div className="flex flex-col px-4 py-3 bg-slate-50/50 rounded-t-xl border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 leading-tight">
                        {profileData?.name}
                      </p>
                      <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                        {profileData?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex h-10 cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-indigo-400 hover:scale-105 transition-all cursor-pointer"
              >
                <UserCircle size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 flex flex-col py-2 bg-slate-900">
          {updatedCategories.map((category) => (
            <NavLink
              key={category.id}
              to={
                category.slug === ""
                  ? "/"
                  : `/news-list/category/${category.slug}`
              }
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      )}

      <UserLogin open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}

export default NavbarCategories;

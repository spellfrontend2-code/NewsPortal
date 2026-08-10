import { getAvatarColor } from "@/components/shared/getAvatarColor";
import { useAuthStore } from "@/context/useAuthStore";
import ArticleRectangleCard from "@/features/articles/components/Public/cards/ArticleRectangleCard";
import { ArticleRectangleCardSkeleton } from "@/features/articles/components/Public/cards/CardSkeleton";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import UserLogin from "@/features/auth/components/UserLogin";
import { useAuthHooks } from "@/features/auth/hooks/useAuth";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { useDebounce } from "@/lib/useDebounce";
import {
  ChevronDown,
  LogOut,
  Menu,
  MoreHorizontal,
  Search,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

  const [openCategory, setOpenCategory] = useState(null);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);
  const [openOthers, setOpenOthers] = useState(false);
  const [openOthersChild, setOpenOthersChild] = useState(null);

  // How many category items actually fit in the visible nav row before
  // we need to tuck the rest away in an "Others" dropdown.
  const [visibleCount, setVisibleCount] = useState(updatedCategories.length);

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

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const categoryRef = useRef(null);
  const othersRef = useRef(null);
  const navRowRef = useRef(null);
  const measureItemRefs = useRef([]);
  const measureOthersRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearch("");
        setSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileInfoOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setOpenCategory(null);
      }
      if (othersRef.current && !othersRef.current.contains(target)) {
        setOpenOthers(false);
        setOpenOthersChild(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Measure how many category items fit in the visible row. Anything that
  // doesn't fit gets moved into the "Others" dropdown instead of being
  // clipped or scrolled - so no ancestor ever needs `overflow` set, which
  // is what was clipping the submenu dropdowns before.
  useEffect(() => {
    const recalc = () => {
      const row = navRowRef.current;
      if (!row) return;
      const availableWidth = row.offsetWidth;
      const itemWidths = measureItemRefs.current.map(
        (el) => el?.offsetWidth || 0,
      );
      const othersWidth = measureOthersRef.current?.offsetWidth || 0;
      const total = itemWidths.reduce((sum, w) => sum + w, 0);

      // Everything fits with room to spare - show it all, no "Others".
      if (total <= availableWidth) {
        setVisibleCount(updatedCategories.length);
        return;
      }

      let running = 0;
      let count = 0;
      const threshold = availableWidth - othersWidth;
      for (let i = 0; i < itemWidths.length; i++) {
        running += itemWidths[i];
        if (running > threshold) break;
        count = i + 1;
      }
      setVisibleCount(Math.max(count, 1));
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    if (navRowRef.current) ro.observe(navRowRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, [updatedCategories.map((c) => c.id).join(",")]);

  // Close mobile drawer + submenus whenever we cross back to desktop width
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (mql.matches) {
        setMobileMenuOpen(false);
        setOpenMobileCategory(null);
      }
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center justify-between gap-1.5 h-full px-2.5 lg:px-3.5 text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2 hover:text-white whitespace-nowrap p-1  ${
      isActive
        ? "text-white border-indigo-500 bg-white/5"
        : "border-transparent text-slate-400 hover:bg-white/5"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex-1 flex items-center px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
      isActive ? "text-white" : "text-slate-300 hover:text-white"
    }`;

  const mobileChildLinkClass = ({ isActive }) =>
    `w-full flex items-center pl-9 pr-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-l-4 ${
      isActive
        ? "text-white border-indigo-500 bg-white/10"
        : "text-slate-400 border-transparent hover:text-white hover:bg-white/5"
    }`;
  const avatarColor = profileData?.id
    ? getAvatarColor(profileData.id)
    : "from-indigo-600 to-indigo-500";

  const visibleCategories = updatedCategories.slice(0, visibleCount);
  const overflowCategories = updatedCategories.slice(visibleCount);

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-800 sticky top-0 z-50">
      {/* ── Main bar ── */}
      <div className="flex h-[54px] w-[92%] sm:w-[85%] md:w-[70%] max-w-screen-xl mx-auto items-center gap-2 md:gap-4">
        {/* Mobile: hamburger toggle (leftmost on small screens) */}
        <button
          className="md:hidden flex items-center justify-center p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop: category links — no overflow/scroll on this row at
            all, so absolutely-positioned submenus below it are never
            clipped. Items that don't fit are measured out into the
            "Others" dropdown instead. */}
        <div ref={navRowRef} className="hidden md:flex items-center h-full min-w-0 flex-1">
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              ref={openCategory === category.id ? categoryRef : undefined}
              className="relative shrink-0"
            >
              <div className="flex justify-between items-center">
                <NavLink
                  to={
                    category.slug === ""
                      ? "/"
                      : `/news-list/category/${category.slug}`
                  }
                  className={navLinkClass}
                >
                  {category.name}
                  {category.children?.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenCategory(
                          openCategory === category.id ? null : category.id,
                        );
                      }}
                      className="cursor-pointer text-slate-400 hover:text-white"
                      aria-label={`Toggle ${category.name} submenu`}
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          openCategory === category.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </NavLink>
              </div>
              {openCategory === category.id && (
                <div className="absolute left-0 mt-2 w-40 rounded-md bg-slate-800 border border-slate-700 shadow-lg z-50 p-1">
                  {category.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={`/news-list/category/${child.slug}`}
                      className="block px-4 py-2 text-sm text-slate-300 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                      onClick={() => setOpenCategory(null)}
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Overflow categories that didn't fit in the row */}
          {overflowCategories.length > 0 && (
            <div ref={othersRef} className="relative shrink-0">
                           <div className="flex justify-between items-center">

              <button
                onClick={() => {
                  setOpenOthers((v) => !v);
                  setOpenOthersChild(null);
                }}
                className={
    `inline-flex items-center justify-between gap-1.5 h-full px-2.5 lg:px-3.5 text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-200 border-b-2 hover:text-white whitespace-nowrap p-1  ${
                  openOthers
                    ? "text-white border-indigo-500 bg-white/5"
                    : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                aria-label="Show more categories"
              >
                Others
                <ChevronDown
                  size={14}
                  className={`transition-transform ${openOthers ? "rotate-180" : ""}`}
                />
              </button>
              </div>

              {openOthers && (
                <div className="absolute left-0 mt-2 w-56 max-w-[85vw] max-h-[70vh] overflow-y-auto rounded-md bg-slate-800 border border-slate-700 text-white shadow-lg z-50 p-1">
                  {overflowCategories.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center justify-between rounded-md hover:bg-white/10 transition-colors">
                        <NavLink
                          to={
                            category.slug === ""
                              ? "/"
                              : `/news-list/category/${category.slug}`
                          }
                          className="flex-1 block px-4 py-2 text-sm text-slate-300 hover:text-white"
                          onClick={() => {
                            setOpenOthers(false);
                            setOpenOthersChild(null);
                          }}
                        >
                          {category.name}
                        </NavLink>
                        {category.children?.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setOpenOthersChild(
                                openOthersChild === category.id
                                  ? null
                                  : category.id,
                              );
                            }}
                            className="px-3 py-2 text-slate-400 hover:text-white"
                            aria-label={`Toggle ${category.name} submenu`}
                          >
                            <ChevronDown
                              size={14}
                              className={`transition-transform ${
                                openOthersChild === category.id
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      {openOthersChild === category.id && (
                        <div className="flex flex-col bg-white/5 rounded-md my-0.5">
                          {category.children.map((child) => (
                            <NavLink
                              key={child.id}
                              to={`/news-list/category/${child.slug}`}
                              className="pl-7 pr-4 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                              onClick={() => {
                                setOpenOthers(false);
                                setOpenOthersChild(null);
                              }}
                            >
                              {child.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hidden measurer: renders every category item off-screen with the
            same classes so we can read real pixel widths and decide how
            many fit before falling back to "Others". */}
        <div
          className="hidden md:flex absolute invisible pointer-events-none items-center"
          style={{ top: -9999, left: -9999 }}
          aria-hidden="true"
        >
          {updatedCategories.map((category, i) => (
            <div
              key={category.id}
              ref={(el) => (measureItemRefs.current[i] = el)}
              className="shrink-0"
            >
              <span className={navLinkClass({ isActive: false })}>
                {category.name}
                {category.children?.length > 0 && <ChevronDown size={14} />}
              </span>
            </div>
          ))}
          <div ref={measureOthersRef} className="shrink-0">
            <span className="inline-flex items-center gap-1.5 h-full px-2.5 lg:px-3.5 text-xs lg:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
              <MoreHorizontal size={16} />
              Others
              <ChevronDown size={14} />
            </span>
          </div>
        </div>

        {/* Right side: search + profile — fixed width, never squeezed
            or overlapped by the category row */}
        <div className="relative flex items-center justify-end gap-2 sm:gap-3 h-full shrink-0 ml-auto md:ml-0">
          {/* Search */}
          <div
            ref={searchRef}
            className="relative flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 transition-all duration-300 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 group w-36 sm:w-40 md:w-44 focus-within:w-48 sm:focus-within:w-56 md:focus-within:w-64"
          >
            <Search
              size={14}
              className="text-slate-400 group-focus-within:text-slate-900 transition-colors shrink-0"
            />
            <input
              className="border-none bg-transparent text-xs text-white outline-none w-full focus:text-slate-900 transition-colors placeholder-slate-500 min-w-0"
              placeholder="Search news..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            {/* Search results dropdown — anchored to the input, clamped
                to the viewport so it never bleeds off-screen */}
            {searchOpen && debouncedSearch && (
              <div className="absolute z-50 right-0 top-[calc(100%+8px)] max-h-72 w-[min(300px,calc(100vw-2rem))] bg-white border border-slate-100 shadow-xl rounded-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 p-2 flex flex-col gap-1.5">
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
          <div className="flex items-center shrink-0">
            {profileData.id ? (
              <div className="relative" ref={profileRef}>
                <button
                  className={`h-8 w-8 rounded-full bg-gradient-to-tr ${avatarColor} border border-white/20 flex justify-center items-center font-bold text-xs text-white cursor-pointer shadow-sm transition-all`}
                  onClick={() => setProfileInfoOpen(!profileInfoOpen)}
                >
                  {profileData?.name?.charAt(0).toUpperCase()}
                </button>
                {profileInfoOpen && (
                  <div className="absolute right-0 mt-2.5 rounded-2xl z-50 shadow-2xl w-[240px] max-w-[calc(100vw-1.5rem)] bg-white border border-slate-100 p-1 text-slate-800 flex flex-col gap-1">
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
        <div className="md:hidden border-t border-slate-800 flex flex-col py-2 bg-slate-900 max-h-[calc(100vh-54px)] overflow-y-auto">
          {updatedCategories.map((category) => (
            <div key={category.id} className="flex flex-col">
              <div
                className={`flex items-center border-l-4 transition-colors ${
                  openMobileCategory === category.id
                    ? "bg-white/5 border-indigo-500"
                    : "border-transparent"
                }`}
              >
                <NavLink
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
                {category.children?.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenMobileCategory(
                        openMobileCategory === category.id
                          ? null
                          : category.id,
                      );
                    }}
                    className="p-3 pr-5 text-slate-400 hover:text-white"
                    aria-label={`Toggle ${category.name} submenu`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openMobileCategory === category.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              {openMobileCategory === category.id && (
                <div className="flex flex-col bg-black/20">
                  {category.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={`/news-list/category/${child.slug}`}
                      className={mobileChildLinkClass}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setOpenMobileCategory(null);
                      }}
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <UserLogin open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}

export default NavbarCategories;
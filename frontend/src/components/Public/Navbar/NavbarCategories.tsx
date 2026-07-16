import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";

function NavbarCategories() {
  const categoryHook = useCategoriesHooks();

  const {
    data: CategoryList,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = categoryHook.useFetchPublicCategories();

  const categories = CategoryList?.data ?? [];

  const updatedCategories = [{ id: 0, name: "Home", slug: "" }, ...categories];

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-[50px] w-full justify-between bg-[var(--color-public-primary)] px-30">
        <div className="flex w-[70%] items-center justify-between">
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

        <div className="flex h-full w-[20%] items-center">
          <div className="flex h-[60%] items-center gap-2 rounded-2xl border-2 border-[var(--color-secondary)] p-2">
            <Search
              size={18}
              strokeWidth={2}
              color="var(--color-public-navtext)"
            />

            <input
              className="border-none bg-[var(--color-public-primary)] text-[var(--color-public-navtext)] outline-none"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarCategories;

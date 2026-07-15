import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="flex items-center justify-center w-full  ">
      <div className="flex  h-[50px] justify-between px-30 w-full bg-[var(--color-public-primary)]">
        <div className="flex w-[70%] items-center justify-between">
           
            {updatedCategories.map((category) => (
              <Link
                key={category.id}
                to={`/${category.slug}`}
                className="font-semibold text-[rgb(var(--color-public-navtext-rgb)/0.8)] hover:text-[var(--color-public-navtext)] p-3 inline-block uppercase"
              >
                {category.name}
              </Link>
            ))}
          
        </div>
        <div className="flex w-[20%] h-full items-center">
          <div className="flex items-center gap-2 h-[60%] border-2 border-[var(--color-secondary)] rounded-2xl p-2">
            <Search size={18} strokeWidth={2} color="var(--color-public-navtext)" />
            <input
              className="bg-[var(--color-public-primary)] outline-none border-none text-[var(--color-public-navtext)]"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarCategories;

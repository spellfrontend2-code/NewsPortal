import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { Search } from "lucide-react";
import NavbarSkeleton from "./NavbarSkeleton";

function Navbar() {
  const categoryHook = useCategoriesHooks();
  const {
    data: CategoryList,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = categoryHook.useFetchPublicCategories();
  const categories = CategoryList?.data ?? [];
  const updatedCategories = [{ id: 0, name: "Home", slug: "" }, ...categories];
  return (
    <div className="flex items-center justify-center w-full  mt-10">
      <div className="flex  h-[50px] justify-between px-30 w-full bg-[var(--color-public-primary)]">
        <div className="flex w-[70%] items-center justify-between">
          {categoriesLoading ? (
           <NavbarSkeleton/>
          ) : (
            updatedCategories.map((category) => (
              <a
                key={category.id}
                href={`/${category.slug}`}
                className="font-semibold text-white p-3 inline-block uppercase"
              >
                {category.name}
              </a>
            ))
          )}
        </div>
        <div className="flex w-[20%] h-full items-center">
          <div className="flex items-center gap-2 h-[60%] border-2 border-[var(--color-secondary)] rounded-2xl p-2">
            <Search size={18} strokeWidth={2} color="white" />
            <input
              className="bg-[var(--color-public-primary)] outline-none border-none text-white"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

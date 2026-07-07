import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import DataTableSkeleton from "@/components/Admin/table/DataTableSkeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import { usePermission } from "@/features/auth/hooks/usePermission";
import CategoryInputForm from "@/features/categories/components/CategoryInputForm";
import CategoryView from "@/features/categories/components/CategoryView";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

function Categories() {
  const {hasPermission}=usePermission();
  const categoriesHook = useCategoriesHooks();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

const { data,isLoading,error } = categoriesHook.useFetchCategories({
  page: pagination.pageIndex + 1,
  per_page: pagination.pageSize,
  search: debouncedSearch,
});
  const categories = data?.data ?? [];
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const deleteCategory = categoriesHook.useDeleteCategories();
  const [sorting, setSorting] = useState([]);
  const columns = generateColumns(
    categories,
    [
      "id",
      "slug",
      "meta_title",
      "meta_description",
      "children",
      "parent",
      "parent_id",
      "position",
    ],
    (action, row) => {
      setSelectedCategory(row);
      switch (action) {
        case "delete":
          setDeleteOpen(true);
          break;
        case "edit":
          setAddCategory(true);
          setEdit(true);
          break;
        case "view":
          setViewOpen(true);
          break;
      }
    },
     undefined, 
  undefined, 
    PERMISSIONS.CATEGORY
  );
  const [addCategory, setAddCategory] = useState(false);
  return (
    <div className="w-full h-screen overflow-y-auto p-20 flex flex-col gap-5 ">
      <div className="flex justify-between items-end rounded-xl">
        <div className="flex flex-col  text-gray-800 ">
          <p className="text-3xl font-bold ">Categories</p>
          <p className="text-gray-500">Manage your categories</p>
        </div>
        {hasPermission(PERMISSIONS.CATEGORY.CREATE) && <Button
          variant="submit"
          className="h-10 flex items-center gap-2"
          onClick={() => setAddCategory(true)}
        >
          <Plus />
          Add Category
        </Button>}
      </div>
      <DeleteDialogBox
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedField={selectedCategory}
        deleteField={deleteCategory}
      />

     
        {hasPermission(PERMISSIONS.CATEGORY.VIEW) && <DataTable
          data={categories}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={data?.pagination?.last_page}
          sorting={sorting}
          setSorting={setSorting}
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          placeholder="Categories"
          
      
        />}
     
      {addCategory && (
        <CategoryInputForm
          setAddCategory={setAddCategory}
          addCategory={addCategory}
          categories={categories}
          edit={edit}
          setEdit={setEdit}
          category={selectedCategory}
        />
      )}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="flex flex-col  !max-w-none p-10 max-h-[80vh] !max-w-[30vw] overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
          <CategoryView category={selectedCategory} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Categories;

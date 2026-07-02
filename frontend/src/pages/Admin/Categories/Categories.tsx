import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/DataTable";
import DataTableSkeleton from "@/components/Admin/table/DataTableSkeleton";
import { Button } from "@/components/ui/button";
import CategoryInputForm from "@/features/categories/components/CategoryInputForm";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import { useState } from "react";

function Categories() {
  const categoriesHook = useCategoriesHooks();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = categoriesHook.useFetchCategories({
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  });
  const categories = data?.data ?? [];
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const deleteCategory = categoriesHook.useDeleteCategories();
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
      }
    },
  );
  const [addCategory, setAddCategory] = useState(false);
  return (
    <div className="w-full h-full p-20 flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="text-4xl font-bold text-[var(--color-primary)] text-center">
          Categories
        </p>
        <Button
          variant="submit"
          className="mt-5"
          onClick={() => setAddCategory(true)}
        >
          <Plus />
          Add Category
        </Button>
      </div>
      <DeleteDialogBox
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedField={selectedCategory}
        deleteField={deleteCategory}
      />

      {isLoading ? (
        <DataTableSkeleton />
      ) : categories?.length > 0 ? (
        <DataTable
          data={categories}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={data?.pagination?.last_page}
        />
      ) : (
        <div>No categories found</div>
      )}
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
    </div>
  );
}

export default Categories;

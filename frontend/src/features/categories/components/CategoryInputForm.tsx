import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import CategoryTree from "./CategoryTree";
import { useCategoriesHooks } from "../hooks/useCategories";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { inputStyle } from "@/components/shared/styles/inputStyle";

function CategoryInputForm({
  setAddCategory,
  addCategory,
  categories,
  edit,
  setEdit,
  category,
}: any) {
  const categoriesHook = useCategoriesHooks();
  const addCategoryHook = categoriesHook.useCreateCategories();
  const editCategory = categoriesHook.useUpdateCategories();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: edit ? category?.name : "",
      description: edit ? category?.description : "",
      parent_id: edit ? String(category?.parent_id) : 0,
      position: edit ? category?.position : 0,
      meta_title: edit ? category?.meta_title : "",
      meta_description: edit ? category?.meta_description : "",
      icon: edit ? category?.icon : "",
    },
  });
  const emptyForm = {
    name: "",
    description: "",
    parent_id: "0",
    position: 0,
    meta_title: "",
    meta_description: "",
    icon: "",
  };
  const onSubmit = (data) => {
    if (edit) {
      editCategory.mutate(
        { id: category?.id, data: data },
        {
          onSuccess: (res) => {
            setEdit(false);
            setAddCategory(false);
            reset(emptyForm);
            toast.success(res?.message || "Category updated successfully");
          },
          onError: (e) => {
            toast.error(e?.message || "Something went wrong");
          },
        },
      );
    } else {
      addCategoryHook.mutate(data, {
        onSuccess: (res) => {
          setAddCategory(false);
          reset(emptyForm);
          toast.success(res?.message || "Category added successfully");
        },
        onError: (e) => {
          toast.error(e?.message || "Something went wrong");
        },
      });
    }
  };
  const isOpen = addCategory || edit;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setAddCategory(false);
          setEdit(false);
        }
      }}
    >
      <DialogContent className="!max-w-none p-10 max-h-[80vh] !max-w-[50vw] overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-[var(--color-secondary)]">
        <div className="">
        
            {/* <ArrowLeftCircle
              className=" cursor-pointer text-[var(--color-secondary)] hover:text-[rgb(var(--color-gray-rgb)/0.5)]"
              size={50}
              strokeWidth={1}
              onClick={() => {
                setEdit(false);
                setAddCategory(false);
                reset(emptyForm);
              }}
            /> */}
            <div className="flex flex-col w-full">
              <p className="text-xl font-bold text-[var(--color-primary)] text-left">
                {edit ? "Edit Category" : "Add New Category"}
              </p>
              <p className="text-sm text-[rgb(var(--color-gray-rgb)/0.7)] text-left">
                Make necessary changes to the category
              </p>
            </div>
        
          <div className="w-full flex justify-center mt-10 ">
            <div className="w-full flex flex-col gap-5 p-10 rounded-2xl border border-[var(--color-secondary)]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-5"
              >
                <div>
                  <label className="font-semibold  text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Category Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`${inputStyle}`}
                  />
                </div>
                <div>
                  <label className="font-semibold  text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Description
                  </label>
                  <textarea
                    id="description"
                    {...register("description")}
                    rows={6}
                    placeholder="Enter category description..."
                    className={`${inputStyle}`}
                  />
                </div>

                <div className="w-full flex justify-between">
                  <div className="w-[45%]">
                    <label className="font-semibold  text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Parent Category
                    </label>
                    <Controller
                      name="parent_id"
                      control={control}
                      render={({ field }) => {
                        const selectedCategory = categories.find(
                          (c) => String(c.id) === String(field.value),
                        );

                        return (
                          <Select
                            value={String(field.value)}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className={inputStyle}>
                              <SelectValue>
                                {selectedCategory?.name ||
                                  "Select parent category"}
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent className="bg-white rounded-none focus:outline-none">
                              <CategoryTree
                                categories={categories}
                                parentId={null}
                              />
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />
                  </div>

                  <div className="w-[45%]">
                    <label className="font-semibold  text-[rgb(var(--color-gray-rgb)/0.7)]">
                      Position
                    </label>
                    <input
                      type="number"
                      {...register("position")}
                      className={`${inputStyle}   [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none
    [-moz-appearance:textfield]`}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold  text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Icon
                  </label>
                  <input
                    type="text"
                    {...register("icon")}
                    className={`${inputStyle}`}
                  />
                </div>
                <div>
                  <label className="font-semibold  text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    {...register("meta_title")}
                    className={`${inputStyle}`}
                  />
                </div>
                <div>
                  <label className="font-semibold  text-[rgb(var(--color-gray-rgb)/0.7)]">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    {...register("meta_description")}
                    rows={6}
                    placeholder="Enter category meta description..."
                    className={`${inputStyle}`}
                  />
                </div>
                <div className="w-full flex justify-end gap-3">
                  <Button
                    variant="submit"
                    type="button"
                    onClick={() => {
                      setEdit(false);
                      setAddCategory(false);
                      reset(emptyForm);
                    }}
                    className="w-[80px] rounded-2xl bg-[rgb(var(--color-gray-rgb)/0.1)] text-black border border-[var(--color-secondary)]"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="submit" className="w-[80px]">
                    {edit
                      ? editCategory.isPending
                        ? "Updating..."
                        : "Update"
                      : addCategoryHook.isPending
                        ? "Adding..."
                        : "Add"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryInputForm;

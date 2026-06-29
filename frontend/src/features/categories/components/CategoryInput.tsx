import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import CategoryTree from "./CategoryTree";
import { useCategoriesHooks } from "../hooks/useCategories";
import { toast } from "sonner";
const inputStyle = `border border-[var(--color-primary)] px-2 py-1 rounded-md w-full focus:outline-none`;

function CategoryInput({ setAddCategory, categories }: any) {
  const categoriesHook = useCategoriesHooks();
  const addCategory = categoriesHook.useAddCategories();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
      parent_id: "",
      position: "",
      slug: "",
      meta_title: "",
      meta_description: "",
      icon: "",
    },
  });

  const onSubmit = (data) => {
    addCategory.mutate(data, {
      onSuccess: (res) => {
        setAddCategory(false);
        toast.success(res?.message || "Category added successfully");
      },
    });
  };
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-5 items-left">
        <Button
          variant="outline"
          className="w-[80px] cursor-pointer"
          onClick={() => setAddCategory(false)}
        >
          <ArrowLeft />
          Back
        </Button>
        <p className="text-3xl font-bold text-[var(--color-primary)] text-left">
          Add New Category
        </p>
      </div>
      <div className="w-full flex justify-center mt-10">
        <div className="w-2/3 rounded-2xl flex flex-col gap-5 border border-[var(--color-secondary)] p-10 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div >
            <label>Category Name</label>
            <input
              type="text"
              {...register("name")}
              className={`${inputStyle}`}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              id="description"
              {...register("description")}
              rows={6}
              placeholder="Enter category description..."
              className={`${inputStyle}`}
            />
          </div>
          <div>
            <label>Parent Category</label>
            <Controller
              name="parent_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={`${inputStyle} cursor-pointer`}>
                    <SelectValue placeholder="Select parent category" />
                    <input type="text" />
                  </SelectTrigger>
                  <SelectContent>
                    <CategoryTree categories={categories} parentId={null} />
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label>Slug</label>
            <input
              type="text"
              {...register("slug")}
              className={`${inputStyle}`}
            />
          </div>
          <div>
            <label>Meta Title</label>
            <input
              type="text"
              {...register("meta_title")}
              className={`${inputStyle}`}
            />
          </div>
          <div>
            <label>Meta Description</label>
            <textarea
              id="metaDescription"
              {...register("meta_description")}
              rows={6}
              placeholder="Enter category meta description..."
              className={`${inputStyle}`}
            />
          </div>
          <div>
            <label>Position</label>
            <input
              type="number"
              {...register("position")}
              className={`${inputStyle}`}
            />
          </div>
          <div>
            <label>Icon</label>
            <input
              type="text"
              {...register("icon")}
              className={`${inputStyle}`}
            />
          </div>
          <div className="text-right">
            <Button variant="outline" type="button" onClick={() => setAddCategory(false)} className="w-[80px]">
              Cancel
            </Button>
            <Button type="submit" variant="submit" className="w-[80px]" >
              Add
            </Button>
          </div>
        </form>
      </div></div>
    </div>
  );
}

export default CategoryInput;

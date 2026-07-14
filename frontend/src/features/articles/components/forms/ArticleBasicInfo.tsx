import { useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Asterisk } from "lucide-react";
function ArticleBasicInfo() {
  const { register, formState: { errors },
 } = useFormContext();
  return (
    <div className="flex flex-col gap-3">
      <div>
  <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
    Title
    <Asterisk className="text-red-500" size={12} />
  </label>

  <input
    {...register("title", { required: "Title is required" })}
    className={`${inputStyle} ${
      errors?.title ? "border-red-500 focus:border-red-500" : ""
    }`}
  />

  <p className="text-xs text-red-500 mt-1 h-4">
    {errors?.title?.message as string}
  </p>
</div>

      {/* Excerpt */}
      <div>
        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Excerpt
        </label>
        <textarea rows={4} {...register("excerpt")} className={inputStyle} />
      </div>
    </div>
  );
}
export default ArticleBasicInfo;

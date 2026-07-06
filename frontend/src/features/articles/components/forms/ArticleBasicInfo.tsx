import { useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";
function ArticleBasicInfo() {
  const { register } = useFormContext();
    return <div className="flex flex-col gap-3">
                <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Title
          </label>
          <input {...register("title")} className={inputStyle} />
        </div>

        {/* Excerpt */}
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Excerpt
          </label>
          <textarea rows={4} {...register("excerpt")} className={inputStyle} />
        </div>
    
    </div>;
}
export default ArticleBasicInfo;
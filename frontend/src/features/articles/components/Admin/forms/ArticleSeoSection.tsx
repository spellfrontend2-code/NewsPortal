import { useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";

function ArticleSeoSection(){
  const {register} = useFormContext();
  return(
        <div className="mt-3 flex flex-col gap-3">
               {/* SEO */}
            
                    <div>
                      <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">Meta Title</label>
            
                      <input {...register("meta_title")} className={inputStyle} />
                    </div>
            
                    <div>
                      <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">Meta Description</label>
            
                      <textarea
                        rows={4}
                        {...register("meta_description")}
                        className={inputStyle}
                      />
                    </div>
        </div>
    )
}
export default ArticleSeoSection
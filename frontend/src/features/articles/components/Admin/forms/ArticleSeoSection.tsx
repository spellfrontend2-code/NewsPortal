import { useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";

function ArticleSeoSection(){
  const {register} = useFormContext();
  return(
        <div className="mt-3 flex flex-col gap-3">
               {/* SEO */}
            
                    <div>
                      <label>Meta Title</label>
            
                      <input {...register("meta_title")} className={inputStyle} />
                    </div>
            
                    <div>
                      <label>Meta Description</label>
            
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
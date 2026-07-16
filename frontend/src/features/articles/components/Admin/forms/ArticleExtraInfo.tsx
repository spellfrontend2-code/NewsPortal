import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WordSeparator from "@/components/shared/WordSeparator";
function ArticleExtraInfo()
{
  const {register} = useFormContext();
    return (
        <div className=" flex flex-col gap-3">
          
                  {/* Schedule */}
          
                  <div>
                    <label>Schedule Publish</label>
          
                    <input
                      type="datetime-local"
                      {...register("scheduled_for")}
                      className={inputStyle}
                    />
                  </div>
          
           <div>
                     <label>Canonical URL</label>
           
                     <input {...register("canonical_url")} className={inputStyle} />
                   </div>
           
                   {/* Location */}
           
                   <div className="grid grid-cols-2 gap-5">
                     <div>
                       <label>City Focus</label>
           
                       <input {...register("city_focus")} className={inputStyle} />
                     </div>
           
                     <div>
                    
                       <WordSeparator  name={"target_countries"} label={"Target Countries"} register={register} />
                     </div>
                   </div> 
        </div>
    )
}
export default ArticleExtraInfo
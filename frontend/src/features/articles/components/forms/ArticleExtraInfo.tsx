import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../styles/inputStyle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
function ArticleExtraInfo()
{
  const {register,control} = useFormContext();
    return (
        <div>
          
                  <div>
                    <label>Status</label>
          
                    <Controller
                      control={control}
                      name="status"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={inputStyle}>
                            <SelectValue />
                          </SelectTrigger>
          
                          <SelectContent className="bg-white">
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
          
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
                       <label>Target Countries (comma separated)</label>
                       <input
                         {...register("target_countries", {
                           setValueAs: (value) => {
                             if (typeof value === "string") {
                               return value.split(",").map((v) => v.trim());
                             }
           
                             return [];
                           },
                         })}
                         className={inputStyle}
                       />
                     </div>
                   </div> 
        </div>
    )
}
export default ArticleExtraInfo
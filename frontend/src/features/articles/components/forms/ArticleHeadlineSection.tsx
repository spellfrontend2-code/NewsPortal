import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Controller, useFormContext } from "react-hook-form"
import { inputStyle } from "@/components/shared/styles/inputStyle";

function ArticleHeadlineSection() {
  const {register,watch,control} = useFormContext();
  const isHeadline = watch("is_headline_news");
    return (
    <div className="grid grid-cols-3 gap-3 mt-3 h-[70px]">
          <div className="flex items-center gap-2 ">
            <input type="checkbox" {...register("is_headline_news")} />

            <label>Headline News</label>
          </div>
          {isHeadline && (
            <>
              <div>
                <label>Headline Display</label>

                <Controller
                  control={control}
                  name="headline_display_type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={inputStyle}>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="image">Image</SelectItem>

                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label>Headline Order</label>

                <input
                  type="number"
                  {...register("headline_order")}
                  className={inputStyle}
                />
              </div>
            </>
          )}
        </div> 
)
}
export default ArticleHeadlineSection
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Controller, useFormContext } from "react-hook-form"
import { inputStyle } from "@/components/shared/styles/inputStyle";

function ArticleHeadlineSection() {
  const {register,watch,control} = useFormContext();
  const isHeadline = watch("is_headline_news");
    return (
    <div className="flex justify-between items-center gap-3 mt-3 h-[80px] w-full bg-[rgb(var(--color-secondary-rgb)/0.1)] rounded-md p-5">
          <div className="w-1/3 flex items-center gap-2">
            <input type="checkbox" {...register("is_headline_news")} className="accent-[var(--color-primary)]"/>

            <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">Mark Headline News</label>
          </div>
          {isHeadline && (
            <div className="w-2/3 flex justify-between gap-3">
              <div className="w-1/2">
                <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">Headline Display</label>

                <Controller
                  control={control}
                  name="headline_display_type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={`${inputStyle} p-5`}>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="image">Image</SelectItem>

                        <SelectItem value="title_only">Title Only</SelectItem>
                        <SelectItem value="mixed">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="w-1/2">
                <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">Headline Order</label>

                <input
                  type="number"
                  {...register("headline_order")}
                  className={inputStyle}
                />
              </div>
            </div>
          )}
  </div> 
)
}
export default ArticleHeadlineSection
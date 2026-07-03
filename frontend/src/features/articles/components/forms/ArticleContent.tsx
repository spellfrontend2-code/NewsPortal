
import { Controller, useFormContext } from "react-hook-form";
import RichTextEditor from "@/components/Admin/richtexteditor/RichTextEditor";
function ArticleContent()
{
  const { control } = useFormContext();
return (
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {/* <textarea rows={10} {...register("content")} className={inputStyle} /> */}
        </div>    )
}
export default ArticleContent
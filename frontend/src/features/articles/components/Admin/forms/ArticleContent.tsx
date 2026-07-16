import { Controller, useFormContext } from "react-hook-form";
import RichTextEditor from "@/components/Admin/richtexteditor/RichTextEditor";
import { Asterisk } from "lucide-react";

function ArticleContent() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-3">
      <label className="flex items-center gap-2 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
        Content<Asterisk className="text-red-500" size={12} />
      </label>

      <div className={`border-1 ${errors.content ? "border-red-500" :"border-[var(--color-secondary)]"} rounded-xl`}><Controller
        name="content"
        control={control}
        rules={{
          required: "Content is required",
          validate: (value) =>
            value?.replace(/<[^>]*>/g, "").trim().length > 0 ||
            "Content is required",
        }}
        render={({ field }) => (
          <RichTextEditor
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      /></div>

      <p className="text-xs text-red-500 mt-1 h-4">
        {errors.content?.message as string}
      </p>
    </div>
  );
}

export default ArticleContent;
import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "@/components/shared/styles/inputStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WordSeparator from "@/components/shared/WordSeparator";
function ArticleExtraInfo() {
  const { register, watch, setValue } = useFormContext();
  return (
    <div className=" flex flex-col gap-3">
      {/* Schedule */}

      <div>
        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Schedule Publish
        </label>

        <input
          type="datetime-local"
          {...register("scheduled_for")}
          className={inputStyle}
        />
      </div>

      <div>
        <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Canonical URL
        </label>

        <input {...register("canonical_url")} className={inputStyle} />
      </div>

      {/* Location */}

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
            City Focus
          </label>

          <input {...register("city_focus")} className={inputStyle} />
        </div>

        <div>
          <WordSeparator
            key={"target_countries"}
            label={"Target Countries"}
            value={watch("target_countries") || []}
            onChange={(value) =>
              setValue("target_countries", value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
export default ArticleExtraInfo;

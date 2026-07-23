import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../../../components/shared/styles/inputStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asterisk } from "lucide-react";

function AdvertisementLinkInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  
  const targets = [
    { name: "Same Tab", value: "_self" },
    { name: "New Tab", value: "_blank" },
  ];
  return (
    <div>
      {/* TARGET URL */}
      <div>
        <label className="flex items-center gap-1 font-semibold text-gray-600">
          Target URL
          <Asterisk className="text-red-500" size={12} />
        </label>
        <input
          {...register("target_url", { required: "Target URL is required" })}
          className={`${inputStyle} ${
            errors?.target_url ? "border-red-500 focus:border-red-500" : ""
          }`}
        />
        <p className="text-xs text-red-500 mt-1 h-4">
          {errors?.target_url?.message as string}
        </p>
      </div>

      {/* TARGET BLANK */}
      <div>
        <label className="font-semibold text-gray-600">Open In</label>
        <Controller
          name="target_blank"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={`${inputStyle} py-5 text-base`}>
                <SelectValue placeholder="Select target" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {targets.map((target) => (
                  <SelectItem key={target.name} value={target.value}>
                    {target.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* CTA */}
      {/* <div>
        <label className="font-semibold text-gray-600">CTA Text</label>
        <input {...register("cta_text")} className={inputStyle} />
      </div> */}


    </div>
  );
}
export default AdvertisementLinkInfo;

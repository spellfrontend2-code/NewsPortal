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
function AdvertisementPricingInfo() {
  const { register, control,formState:{errors} } = useFormContext();
  const pricingModels = ["cpm","cpc","cpd","sponsored"];
  return (
    <div>
      {/* PRICING */}
      <div>
        <label className="font-semibold text-gray-600">Pricing Model</label>
        <Controller
          name="pricing_model"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={`${inputStyle} py-5 text-lg `}>
                <SelectValue placeholder="Select pricing model" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {pricingModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <label className="flex items-center gap-1 font-semibold text-gray-600">Price
                    <Asterisk className="text-red-500" size={12} />

        </label>
        <input type="number" {...register("price",{required:"Price is required"})} 
         className={`${inputStyle} ${
            errors?.price ? "border-red-500 focus:border-red-500" : ""
          }`}        />
          <p className="text-xs text-red-500 mt-1 h-4">
          {errors?.price?.message as string}
        </p>
      </div>

      <div>
        <label className="font-semibold text-gray-600">Daily Budget</label>
        <input
          type="number"
          {...register("daily_budget")}
          className={inputStyle}
        />
      </div>

      <div>
        <label className="font-semibold text-gray-600">Total Budget</label>
        <input
          type="number"
          {...register("total_budget")}
          className={inputStyle}
        />
      </div>
    </div>
  );
}
export default AdvertisementPricingInfo;

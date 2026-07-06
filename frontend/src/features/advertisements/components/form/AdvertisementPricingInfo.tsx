import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../../../components/shared/styles/inputStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function AdvertisementPricingInfo() {
  const { register, control } = useFormContext();
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
              <SelectTrigger className={inputStyle}>
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
        <label className="font-semibold text-gray-600">Price</label>
        <input type="number" {...register("price")} className={inputStyle} />
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

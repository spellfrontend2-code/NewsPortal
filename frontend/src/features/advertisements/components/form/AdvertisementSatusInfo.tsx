import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../../../components/shared/styles/inputStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function AdvertisementStatusInfo() {
  const { register, control } = useFormContext();
const status = [
  { name: "Draft", value: "draft" },
  { name: "Active", value: "active" },
  { name: "Paused", value: "paused" },
  { name: "Ended", value: "ended" },
  { name: "Pending Approval", value: "pending_approval" },
  { name: "Rejected", value: "rejected" },
  { name: "Archived", value: "archived" },
];

  return (
    <div>
      {/* PRIORITY */}
      <div>
        <label className="font-semibold text-gray-600">Priority</label>
        <input type="number" {...register("priority")} className={inputStyle} />
      </div>

      {/* STATUS */}
      <div>
        <label className="font-semibold text-gray-600">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={inputStyle}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {status.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
export default AdvertisementStatusInfo;

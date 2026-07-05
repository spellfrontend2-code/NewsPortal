import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../styles/inputStyle";
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
    { name: "Active", value: "active" },
    { name: "Inactive", value: "inactive" },
    { name: "Draft", value: "draft" },
  ];
  const approval = [
    { name: "Approved", value: "true" },
    { name: "Rejected", value: "false" },
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

      {/* APPROVAL */}
      <div>
        <label className="font-semibold text-gray-600">Approval</label>
                <Controller
          name="approved"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value !== undefined ? String(field.value) : ""}
              onValueChange={(value) => field.onChange(value === "true")}
            >
              <SelectTrigger className={inputStyle}>
                <SelectValue placeholder="Select approval status" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {approval.map((item) => (
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

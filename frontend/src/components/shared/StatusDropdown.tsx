import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inputStyle } from "@/components/shared/styles/inputStyle";

function StatusDropdown({ statuses, setStatus, status,name }) {
return (
    <div className="w-full flex gap-3 m-3 items-center">
      <Select
         value={status===undefined?"": status}

        onValueChange={(value) => setStatus(value)}
      >
        <SelectTrigger className={`${inputStyle} w-[120px]`}>
          <SelectValue placeholder={`Select ${name}`} />
        </SelectTrigger>

        <SelectContent className="bg-white">
          {statuses.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatusDropdown;
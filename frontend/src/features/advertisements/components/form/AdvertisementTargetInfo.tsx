import { useFormContext } from "react-hook-form";
import WordSeparator from "@/components/shared/WordSeparator";

function AdvertisementTargetInfo() {
  const { watch, setValue } = useFormContext();

  const targets = [
    {
      name: "target_countries",
      label: "Countries",
    },
    {
      name: "target_devices",
      label: "Devices",
    },
    {
      name: "target_audiences",
      label: "Audiences",
    },
  ];

  return (
    <div className="space-y-6">
      {targets.map((target) => (
        <WordSeparator
          key={target.name}
          label={target.label}
          value={watch(target.name) || []}
          onChange={(value) =>
            setValue(target.name, value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      ))}
    </div>
  );
}

export default AdvertisementTargetInfo; 
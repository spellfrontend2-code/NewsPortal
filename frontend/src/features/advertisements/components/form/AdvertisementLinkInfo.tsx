import { Controller, useFormContext } from "react-hook-form";
import { inputStyle } from "../../../../components/shared/styles/inputStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AdvertisementLinkInfo() {
  const { register, control } = useFormContext();
  const placements = [
    { name: "header_banner" },
    { name: "footer_banner" },
    { name: "sidebar" },
    { name: "in_article_top" },
    { name: "in_article_middle" },
    { name: "in_article_bottom" },
    { name: "between_articles" },
    { name: "popup" },
    { name: "native_feed" },
    { name: "mobile_interstitial" },
    { name: "video_pre_roll" },
    { name: "video_mid_roll" },
    { name: "video_post_roll" },
  ];
  const targets = [
    { name: "Same Tab", value: "_self" },
    { name: "New Tab", value: "_blank" },
  ];
  return (
    <div>
      {/* TARGET URL */}
      <div>
        <label className="font-semibold text-gray-600">Target URL</label>
        <input {...register("target_url")} className={inputStyle} />
      </div>

      {/* TARGET BLANK */}
      <div>
        <label className="font-semibold text-gray-600">Open In</label>
        <Controller
          name="target_blank"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={inputStyle}>
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
      <div>
        <label className="font-semibold text-gray-600">CTA Text</label>
        <input {...register("cta_text")} className={inputStyle} />
      </div>

      {/* PLACEMENT */}
      <div>
        <label className="font-semibold text-gray-600">Placement</label>
        <Controller
          name="placement"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={inputStyle}>
                <SelectValue placeholder="Select a placement" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                {placements.map((placement) => (
                  <SelectItem key={placement.name} value={placement.name}>
                    {placement.name}
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
export default AdvertisementLinkInfo;

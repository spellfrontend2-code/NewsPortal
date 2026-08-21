import { useFormContext } from "react-hook-form";
import { inputStyle } from "../../../../components/shared/styles/inputStyle";
import { Asterisk } from "lucide-react";
function AdvertisementBasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="">
      {/* TITLE */}
      <div>
        <label className="flex items-center gap-1 font-semibold text-[rgb(var(--color-gray-rgb)/0.7)]">
          Title
          <Asterisk className="text-red-500" size={12} />
        </label>

        <input
          {...register("title", { required: "Title is required" })}
          className={`${inputStyle} ${
            errors?.title ? "border-red-500 focus:border-red-500" : ""
          }`}
        />

        <p className="text-xs text-red-500 mt-1 h-4">
          {errors?.title?.message as string}
        </p>
      </div>

      {/* ADVERTISER NAME */}
      <div>
        <label className="flex items-center gap-1 font-semibold text-gray-600">
          Advertiser Name
          <Asterisk className="text-red-500" size={12} />
        </label>
        <input
          {...register("advertiser_name", {
            required: "Advertiser Name is required",
          })}
          className={`${inputStyle} ${
            errors?.advertiser_name ? "border-red-500 focus:border-red-500" : ""
          }`}
        />
         <p className="text-xs text-red-500 mt-1 h-4">
          {errors?.advertiser_name?.message as string}
        </p>
      </div>

      {/* EMAIL */}
      <div>
        <label className="font-semibold text-gray-600">Advertiser Email</label>
        <input
          type="email"
          {...register("advertiser_email")}
          className={inputStyle}
        />
        
      </div>

      {/* WEBSITE */}
      <div>
        <label className="font-semibold text-gray-600">
          Advertiser Website
        </label>
        <input {...register("advertiser_website")} className={inputStyle} />
      </div>
    </div>
  );
}
export default AdvertisementBasicInfo;

import { useFormContext } from "react-hook-form";
import { inputStyle } from "../../styles/inputStyle";
function AdvertisementBasicInfo()
{
    const { register } = useFormContext();
    return (
        <div className="">
              {/* TITLE */}
        <div>
          <label className="font-semibold text-gray-600">Title</label>
          <input {...register("title")} className={inputStyle} />
        </div>

        {/* ADVERTISER NAME */}
        <div>
          <label className="font-semibold text-gray-600">Advertiser Name</label>
          <input {...register("advertiser_name")} className={inputStyle} />
        </div>

        {/* EMAIL */}
        <div>
          <label className="font-semibold text-gray-600">
            Advertiser Email
          </label>
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
    )
}
export default AdvertisementBasicInfo
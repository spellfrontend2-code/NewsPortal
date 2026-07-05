import { useFormContext } from "react-hook-form";
import { inputStyle } from "../../styles/inputStyle";

function AdvertisementScheduleInfo()
{
    const {register}=useFormContext();
    return (
        <div>
            
                    {/* SCHEDULE */}
                    <div>
                      <label className="font-semibold text-gray-600">Start Date</label>
                      <input
                        type="datetime-local"
                        {...register("starts_at")}
                        className={inputStyle}
                      />
                    </div>
            
                    <div>
                      <label className="font-semibold text-gray-600">End Date</label>
                      <input
                        type="datetime-local"
                        {...register("ends_at")}
                        className={inputStyle}
                      />
                    </div>
            
                    <div>
                      <label className="font-semibold text-gray-600">
                        Daily Start Time
                      </label>
                      <input
                        type="time"
                        {...register("daily_start_time")}
                        className={inputStyle}
                      />
                    </div>
            
                    <div>
                      <label className="font-semibold text-gray-600">Daily End Time</label>
                      <input
                        type="time"
                        {...register("daily_end_time")}
                        className={inputStyle}
                      />
                    </div>
            
        </div>
    )
}
export default AdvertisementScheduleInfo
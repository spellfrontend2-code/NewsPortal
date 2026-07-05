import { useFormContext } from "react-hook-form";
import { inputStyle } from "../../styles/inputStyle";
import WordSeparator from "@/components/shared/WordSeparator";

function AdvertisementTargetInfo()
{
    const {register}=useFormContext();
    const targets=[
      {
        name:"target_countries",
        label:"Countries"
      },
    {
      name:"target_devices",
      label:"Devices"
    },
    {
      name:"target_audiences",
      label:"Audiences"
    }
    ]
    return (
        <div>
             {targets?.map((target)=><WordSeparator name={target.name} label={target.label} register={register}/>)}
                    
        </div>
    )
}
export default AdvertisementTargetInfo
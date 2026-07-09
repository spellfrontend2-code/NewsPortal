import { settingsApi } from "@/services/api/settings/settingsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const settings=settingsApi();
export const useSettingHooks = () => {
    const queryClient = useQueryClient();
    return {
       useFetchSettings:() => {
           return useQuery({
               queryKey: ["settings"],
               queryFn: () => settings.fetchSettings(),
           });
        },

        useUpdateSettings:() => {
            return useMutation({
                mutationFn:({id,data}:any)=>settings.updateSettings({id,data}),
                onSuccess:()=>{
                  queryClient.invalidateQueries(["settings"])  
                },
            })
         },
    }
}
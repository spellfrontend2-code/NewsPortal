import { dashboardApi } from "@/services/api/dashboard/dashboardApi"
import { useQuery } from "@tanstack/react-query"

const dashboard=dashboardApi()
export const useDashboardHooks=()=>{
    return {
        useFetchDashboard:()=>{
            return useQuery(
                {
                    queryFn:()=>dashboard.fetchDashboard(),
                    queryKey:["dashboard"],

                }
            )
        }
    }

}
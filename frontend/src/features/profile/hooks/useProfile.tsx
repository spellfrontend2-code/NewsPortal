import { profileApi } from "@/services/api/profile/profileApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const profile=profileApi()
export const useProfileHooks=()=>{
    const queryClient = useQueryClient()
    return {
        useFetchProfile:()=>{
            return useQuery({
                queryFn:()=>profile.fetchProfile(),
                queryKey:["profile"]
            })
        },
        useUpdateProfile:()=>{
            return useMutation({
                mutationFn:(data:any)=>profile.updateProfile(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["profile"])
                }
            })
        },
        useChangePassword:()=>{
            return useMutation({
                mutationFn:(data:any)=>profile.changePassword(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["profile"])
                }
            })
        }
    }
}
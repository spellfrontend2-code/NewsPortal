import { authApi } from "@/services/api/auth/authApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { use } from "react"
const auth=authApi()
export const useAuthHooks=()=>{
    const queryClient=useQueryClient()
    return{
        useAdminLogin:()=>{
            return useMutation({
                mutationFn:(data:any)=>auth.AdminLogin(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["admin"])
                }
            })
        },
        useRefreshToken:()=>{
            return useMutation({
                mutationFn:(data:any)=>auth.refreshToken(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["admin"])
                }
            })
        },
        useLogout:()=>{
            return useMutation({
                mutationFn:()=>auth.AdminLogout(),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["admin"])
                }
            })
        },
        useFetchProfile:()=>{
            return useQuery({
                queryFn:()=>auth.FetchProfile(),
                queryKey:["admin"]
            })
        }

    }
}

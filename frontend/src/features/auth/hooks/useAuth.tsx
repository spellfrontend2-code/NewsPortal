import { authApi } from "@/services/api/auth/authApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { use } from "react"
const auth=authApi()
export const useAuthHooks=()=>{
    const queryClient=useQueryClient()
    return{
        useLogin:()=>{
            return useMutation({
                mutationFn:(data:any)=>auth.Login(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["admin","public_user"])
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
                    queryClient.invalidateQueries(["admin","public_user"])
                }
            })
        },
        useFetchProfile:()=>{
            return useQuery({
                queryFn:()=>auth.FetchProfile(),
                queryKey:["admin","public_user"]
            })
        },
        useCreatePublicUser:()=>{
            return useMutation({
                mutationFn:(data:any)=>auth.CreatePublicUser(data),
                onSuccess:()=>{
                    queryClient.invalidateQueries(["admin","public_user"])
                }
            })
        }

    }
}

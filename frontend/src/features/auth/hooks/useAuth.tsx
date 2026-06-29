import { authApi } from "@/services/api/auth/authApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
        }

    }
}

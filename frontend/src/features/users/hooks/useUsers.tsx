import { userApi } from "@/services/api/users/userApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const users=userApi()
export const useUsersHooks=()=>{
    const queryClient = useQueryClient();
    return{
useFetchUsers:()=>{
    return useQuery({
        queryFn:()=>users.fetchUsers(),
        queryKey:["users"]
    })
},
useDeleteUser:()=>{
    return useMutation({
        mutationFn:(id:any)=>users.deleteUser(id),
        onSuccess:()=>{
            queryClient.invalidateQueries(["users"])
        }
    })
}
    }
}
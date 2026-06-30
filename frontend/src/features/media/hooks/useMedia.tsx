import { mediaApi } from "@/services/api/media/mediaApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const media=mediaApi()
export const useMediaHooks=()=>{
    const queryCLient=useQueryClient()
    return{
        useAddMedia:()=>{
            return useMutation({
                mutationFn:(data:any)=>media.addMedia(data),
                onSuccess:()=>{queryCLient.invalidateQueries(["media"])},
            })
        },
        useFetchMedia:()=>{
            return useQuery({
                queryFn:()=>media.fetchMedia(),
                queryKey:["media"]
            })
        }
    }
}
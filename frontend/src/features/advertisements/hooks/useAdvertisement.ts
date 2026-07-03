import { advertisementsApi } from "@/services/api/advertisements/advertisementApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const advertisements=advertisementsApi();
export const useAdvertisementHooks = () => {
    const queryClient = useQueryClient();
  return {
    useFetchAdvertisements: ({ page, per_page,search }: { page: number; per_page: number,search?:string}) => {
      return useQuery({
        queryFn: () =>
          advertisements.fetchAdvertisements({ page: 1, per_page: 10,search }),
            queryKey: ["advertisements"],
      });
    },
    useDeleteAdvertisement: () => {
      return useMutation({
        mutationFn: (id: any) => advertisements.deleteAdvertisement(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["advertisements"]);
        }  
    });
    }
  };
};

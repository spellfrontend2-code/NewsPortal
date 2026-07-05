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
    useCreateAdvertisement: () => {
      return useMutation({
        mutationFn: (data: any) => advertisements.createAdvertisement(data),
        onSuccess: () => {
          queryClient.invalidateQueries(["advertisements"]);
        },
      });
    },
    useUpdateAdvertisement: () => {
      return useMutation({
        mutationFn: ({ id, data }: { id: any; data: any }) =>
          advertisements.updateAdvertisement(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries(["advertisements"]);
        },
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

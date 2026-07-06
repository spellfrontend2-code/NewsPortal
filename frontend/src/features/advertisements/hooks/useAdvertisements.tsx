import { advertisementsApi } from "@/services/api/advertisements/advertisementApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const advertisements=advertisementsApi();
export const useAdvertisementHooks = () => {
    const queryClient = useQueryClient();
  return {
    useFetchAdvertisements: ({ page, per_page,search,status }: { page: number; per_page: number,search?:string,status?:string}) => {
      return useQuery({
        queryFn: () =>
          advertisements.fetchAdvertisements({ page, per_page,search,status }),
            queryKey: ["advertisements", page, per_page,search,status],
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
    useUpdateAdvertisementStatus: () => {
      return useMutation({
        mutationFn: ({ id, data }: { id: any; data: any }) =>
          advertisements.updateAdvertisementStatus(id, data),
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

import { advertisementsApi } from "@/services/api/advertisements/advertisementApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const advertisements = advertisementsApi();
export const useAdvertisementHooks = () => {
  const queryClient = useQueryClient();
  return {
    useFetchAdvertisements: ({
      page,
      per_page,
      search,
      status,
      is_approved,
    }: {
      page: number;
      per_page: number;
      search?: string;
      status?: string;
      is_approved?: boolean;
    }) => {
      return useQuery({
        queryFn: () =>
          advertisements.fetchAdvertisements({
            page,
            per_page,
            search,
            status,
            is_approved,
          }),
        queryKey: [
          "advertisements",
          page,
          per_page,
          search,
          status,
          is_approved,
        ],
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
    useUpdateAdvertisementApproval: () => {
      return useMutation({
        mutationFn: (id: any) => advertisements.updateAdvertisementApproval(id),

        onMutate: async (id) => {
          await queryClient.cancelQueries({
            queryKey: ["advertisements"],
          });

          const previousAdvertisements = queryClient.getQueriesData({
            queryKey: ["advertisements"],
          });

          queryClient.setQueriesData(
            {
              queryKey: ["advertisements"],
            },
            (old: any) => {
              if (!old) return old;

              return {
                ...old,
                data: old.data?.map((item: any) =>
                  item.id === id
                    ? {
                        ...item,
                        approved: !item.approved,
                      }
                    : item,
                ),
              };
            },
          );

          return { previousAdvertisements };
        },

        onError: (_error, _id, context) => {
          context?.previousAdvertisements?.forEach(([queryKey, data]) => {
            queryClient.setQueryData(queryKey, data);
          });
        },

        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: ["advertisements"],
          });
        },
      });
    },
    useDeleteAdvertisement: () => {
      return useMutation({
        mutationFn: (id: any) => advertisements.deleteAdvertisement(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["advertisements"]);
        },
      });
    },
    useFetchPublicAdvertisements: () => {
      return useQuery({
        queryFn: () => advertisements.fetchPublicAdvertisements(),
        queryKey: ["public_advertisements"],
      });
    },
    useTrackPublicAdClick: () => {
      return useMutation({
        mutationFn: (advertisement_id: any) => advertisements.trackPublicAdClick(advertisement_id),
      });
    },
    useTrackPublicAdImpression: () => {
      return useMutation({
        mutationFn: (advertisement_id: any) => advertisements.trackPublicAdImpression(advertisement_id),
      });
    },
  };
};

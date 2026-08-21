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
      placement,
    }: {
      page: number;
      per_page: number;
      search?: string;
      status?: string;
      is_approved?: boolean;
      placement?: string;
    }) => {
      return useQuery({
        queryFn: () =>
          advertisements.fetchAdvertisements({
            page,
            per_page,
            search,
            status,
            is_approved,
            placement,
          }),
        queryKey: [
          "advertisements",
          page,
          per_page,
          search,
          status,
          is_approved,
          placement,
        ],
      });
    },

    useFetchFormOptions: (params?: { article_search?: string; article_id?: any }) => {
      return useQuery({
        queryKey: ["advertisement_form_options", params],
        queryFn: () => advertisements.fetchFormOptions(params),
        staleTime: 5 * 60 * 1000,
      });
    },

    useFetchArticlesForAd: (
      params?: { search?: string; per_page?: number; article_id?: any },
      enabled = true
    ) => {
      return useQuery({
        queryKey: ["advertisement_articles", params],
        queryFn: () => advertisements.fetchArticlesForAd(params),
        enabled,
      });
    },

    useFetchSingleAdvertisement: (id: any) => {
      return useQuery({
        queryKey: ["advertisement", id],
        queryFn: () => advertisements.fetchSingleAdvertisement(id),
        enabled: !!id,
      });
    },

    useCreateAdvertisement: () => {
      return useMutation({
        mutationFn: (data: any) => advertisements.createAdvertisement(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["advertisements"] });
        },
      });
    },

    useUpdateAdvertisement: () => {
      return useMutation({
        mutationFn: ({ id, data }: { id: any; data: any }) =>
          advertisements.updateAdvertisement(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["advertisements"] });
          queryClient.invalidateQueries({ queryKey: ["advertisement"] });
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
          queryClient.invalidateQueries({ queryKey: ["advertisements"] });
        },
      });
    },

    useFetchPublicAdvertisements: (params?: {
      page_type?: string;
      section_id?: number | string;
      section_type?: string;
    }) => {
      return useQuery({
        queryFn: () => advertisements.fetchPublicAdvertisements(params),
        queryKey: [
          "public_advertisements",
          params?.page_type,
          params?.section_id,
          params?.section_type,
        ],
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

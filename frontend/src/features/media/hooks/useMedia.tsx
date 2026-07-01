import { mediaApi } from "@/services/api/media/mediaApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const media = mediaApi();
export const useMediaHooks = () => {
  const queryCLient = useQueryClient();
  return {
    useAddMedia: () => {
      return useMutation({
        mutationFn: (data: any) => media.addMedia(data),
        onSuccess: () => {
          queryCLient.invalidateQueries(["media"]);
        },
      });
    },
    useFetchMedia: ({ search, page, per_page }: { search?: string; page?: number; per_page?: number }) => {
      return useQuery({
        queryFn: () => media.fetchMedia({ search, page, per_page }),
        queryKey: ["media", search, page, per_page],
      });
    },
    useDeleteMedia: () => {
      return useMutation({
        mutationFn: (id: any) => media.deleteMedia(id),
        onSuccess: () => {
          queryCLient.invalidateQueries(["media"]);
        },
      });
    },
  };
};

import { mediaApi } from "@/services/api/media/mediaApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const media = mediaApi();
export const useMediaHooks = () => {
  const queryCLient = useQueryClient();
  return {
    useAddBulkMedia: () => {
      return useMutation({
        mutationFn: (data: any) => media.addBulkMedia(data),
        onSuccess: () => {
          queryCLient.invalidateQueries(["media"]);
        },
      });
    },
    useAddMedia: () => {
      return useMutation({
        mutationFn: (data: any) => media.addMedia(data),
        onSuccess: () => {
          queryCLient.invalidateQueries(["media"]);
        },
      });
    },
    useFetchMedia: ({ search, page, per_page,file_type }: { search?: string; page?: number; per_page?: number,file_type?:string }) => {
      return useQuery({
        queryFn: () => media.fetchMedia({ search, page, per_page,file_type }),
        queryKey: ["media", search, page, per_page,file_type],
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

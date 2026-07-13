import { authorApi } from "@/services/api/authors/authorApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const author = authorApi();
export const useAuthorHooks = () => {
  const queryClient = useQueryClient();
  return {
    useFetchAuthors: ({
      page,
      per_page,
      search,
      status
    }: {
      page: number;
      per_page: number;
      search?: string;
      status?:string
    }) => {
      return useQuery({
        queryFn: () => author.fetchAuthors({ page, per_page, search,status }),
        queryKey: ["authors", page, per_page, search,status],
      });
    },
    useDeleteAuthors: () => {
      return useMutation({
        mutationFn: (id: any) => author.deleteAuthors(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["authors"]);
        },
      });
    },
    useCreateAuthor: () => {
      return useMutation({
        mutationFn: (data: any) => author.createAuthor(data),
        onSuccess: () => {
          queryClient.invalidateQueries(["authors"]);
        },
      });
    },
    useUpdateAuthor: () => {
      return useMutation({
        mutationFn: ({ data, id }: any) => author.updateAuthor(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries(["authors"]);
        },
      });
    },
   useUpdateStatus: () => {
  return useMutation({
    mutationFn: ({ id, status }: any) =>
      author.updateStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({
        queryKey: ["authors"],
      });

      const previousAuthors = queryClient.getQueriesData({
        queryKey: ["authors"],
      });

      queryClient.setQueriesData(
        {
          queryKey: ["authors"],
        },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data?.map((item: any) =>
              item.id === id
                ? {
                    ...item,
                    status: status,
                  }
                : item
            ),
          };
        }
      );

      return { previousAuthors };
    },

    onError: (_error, _variables, context) => {
      context?.previousAuthors?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["authors"],
      });
    },
  });
},
  };
};

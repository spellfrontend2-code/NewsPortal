import { articleApi } from "@/services/api/articles/articleApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const articles = articleApi();
export const useArticlesHooks = () => {
  const queryClient = useQueryClient();
  return {
    useFetchArticles: ({ page, per_page, search, status }) => {
      return useQuery({
        queryKey: ["articles", page, per_page, search, status],
        queryFn: () =>
          articles.fetchArticles({
            page,
            per_page: per_page,
            search,
            status,
          }),
        retry: false,
      })
    },
    useFetchAdminSingleArticle: (id: any) => {
      return useQuery({
        queryKey: ["admin_single_article", id],
        queryFn: () => articles.fetchSingleArticle(id),
        enabled: !!id,
      });
    },
    useCreateArticles: () => {
      return useMutation({
        mutationFn: (data: any) => articles.createArticle(data),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useUpdateArticles: () => {
      return useMutation({
        mutationFn: ({ id, data }: { data: any; id: any }) =>
          articles.updateArticle(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useStatusUpdateArticles: () => {
      return useMutation({
        mutationFn: ({ id, data }: { data: any; id: any }) =>
          articles.statusUpdateArticle(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useDeleteArticles: () => {
      return useMutation({
        mutationFn: (id: any) => articles.deleteArticle(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useFetchHeadlineArticles: ({ page, per_page }) => {
      return useQuery({
        queryKey: ["headline_articles"],
        queryFn: () =>
          articles.fetchPublicHeadlineArticles({
            page,
            per_page,
          }),
      });
    },
    useFetchPublicFeedArticles: ({
      page,
      per_page,
      from_date,
      to_date,
      slug,
    }: {
      page: number;
      per_page: number;
      from_date?: string;
      to_date?: string;
      slug?: string;
    }) => {
      return useQuery({
        queryKey: ["public_articles", page, per_page, from_date, to_date, slug],
        queryFn: () =>
          articles.fetchPublicFeedArticles({
            page,
            per_page,
            from_date,
            to_date,
            slug,
          }),
      });
    },
    useFetchPublicLatestArticles: ({
      page,
      per_page,
    }: {
      page: number;
      per_page: number;
    }) => {
      return useQuery({
        queryKey: ["public_latest_articles", page, per_page],
        queryFn: () => articles.fetchPublicLatestArticles({ page, per_page }),
      });
    },
    useFetchPublicArticlesByCategory: ({
      page,
      per_page,
      slug,
    }: {
      page: number;
      per_page: number;
      slug?: string;
      
    }) => {
      return useQuery({
        queryKey: [
          "public_articles_by_category",
          page,
          per_page,
          slug,
         
        ],
        queryFn: () =>
          articles.fetchPublicArticlesByCategory({
            page,
            per_page,
            slug,
           
          }),
      });
    },
    useFetchPublicSingleArticle: (slug) => {
      return useQuery({
        queryKey: ["public_single_articles", slug],
        queryFn: () => articles.fetchPublicSingleArticle(slug),
      });
    },
   useSearchPublicArticles: (
  {
    page,
    per_page,
    search,
  }: {
    page: number;
    per_page: number;
    search?: string;
  },
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: ["public_search_articles", page, per_page, search],
    queryFn: () => {
      return articles.searchPublicArticles({
        page,
        per_page,
        search,
      });
    },
    enabled: options?.enabled ?? !!search?.trim(),
  });
},
    useFetchRelatedArticles:(slug?:string)=>{
      return useQuery({
        queryKey:["related_articles",slug],
        queryFn:()=>articles.fetchRelatedArticles(slug)})
      },
 useLikePublicArticle: () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      articles.likeArticle(id),

    onMutate: async ({ id, slug }) => {
      await queryClient.cancelQueries({
        queryKey: ["public_single_articles", slug],
      });

      const previousData = queryClient.getQueryData([
        "public_single_articles",
        slug,
      ]);

      queryClient.setQueryData(
        ["public_single_articles", slug],
        (old: any) => {
          if (!old?.article) return old;

          const article = old.article;

          const isLiked =
            article.user_interactions?.has_liked === true;

          const wasDisliked =
            article.user_interactions?.has_dislike === true;

          return {
            ...old,

            article: {
              ...article,

              // Toggle like count
              likes_count: isLiked
                ? Math.max(0, (article.likes_count ?? 0) - 1)
                : (article.likes_count ?? 0) + 1,

              // Remove dislike when liking
              dislikes_count: wasDisliked
                ? Math.max(0, (article.dislikes_count ?? 0) - 1)
                : article.dislikes_count ?? 0,

              user_interactions: {
                ...article.user_interactions,

                has_liked: !isLiked,
                has_dislike: false,
              },
            },
          };
        }
      );

      return { previousData };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["public_single_articles", _variables.slug],
          context.previousData
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["public_single_articles", variables.slug],
      });
    },
  });
},
 useDislikePublicArticle: () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      articles.dislikeArticle(id),

    onMutate: async ({ id, slug }) => {
      await queryClient.cancelQueries({
        queryKey: ["public_single_articles", slug],
      });

      const previousData = queryClient.getQueryData([
        "public_single_articles",
        slug,
      ]);

      queryClient.setQueryData(
        ["public_single_articles", slug],
        (old: any) => {
          if (!old?.article) return old;

          const article = old.article;

          const isDisliked =
            article.user_interactions?.has_dislike === true;

          const wasLiked =
            article.user_interactions?.has_liked === true;

          return {
            ...old,

            article: {
              ...article,

              dislikes_count: isDisliked
                ? Math.max(0, (article.dislikes_count ?? 0) - 1)
                : (article.dislikes_count ?? 0) + 1,

              likes_count: wasLiked
                ? Math.max(0, (article.likes_count ?? 0) - 1)
                : article.likes_count ?? 0,

              user_interactions: {
                ...article.user_interactions,

                has_dislike: !isDisliked,
                has_liked: false,
              },
            },
          };
        }
      );

      return { previousData };
    },

    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["public_single_articles", variables.slug],
          context.previousData
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["public_single_articles", variables.slug],
      });
    },
  });
},
    useSharePublicArticle: () => {
      return useMutation({
        mutationFn: ({ id, platform }: any) =>
          articles.shareArticle({ id, platform }),
        onSuccess: () => {
          queryClient.invalidateQueries(["like"]);
        },
      });
    },
    useViewPublicArticle: () => {
      return useMutation({
        mutationFn: (id: any) => articles.viewArticle(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useReportPublicArticle: () => {
      return useMutation({
        mutationFn: (id: any) => articles.reportArticle(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
useBookmarkPublicArticle: () => {
  return useMutation({
    mutationFn: ({ id }: { id: number; slug: string }) =>
      articles.bookmarkArticle(id),

    onMutate: async ({ slug }) => {
      await queryClient.cancelQueries({
        queryKey: ["public_single_articles", slug],
      });

      const queryKey = ["public_single_articles", slug];

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old?.article) return old;

        return {
          ...old,

          article: {
            ...old.article,

            user_interactions: {
              ...old.article.user_interactions,

              // Toggle bookmark immediately
              has_bookmarked:
                !old.article.user_interactions?.has_bookmarked,
            },
          },
        };
      });

      return { previousData };
    },

    onError: (_error, variables, context) => {
      // Rollback if API fails
      if (context?.previousData) {
        queryClient.setQueryData(
          ["public_single_articles", variables.slug],
          context.previousData
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      // Confirm with server
      queryClient.invalidateQueries({
        queryKey: ["public_single_articles", variables.slug],
      });
    },
  });
},
    useCommentPublicArticle: () => {
      return useMutation({
        mutationFn: ({ commentData }: any) =>
          articles.commentArticle({ commentData }),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    useAdminCommentDelete: () => {
      return useMutation({
        mutationFn: (id: any) => articles.adminCommentDelete(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    usePublicCommentDelete: () => {
      return useMutation({
        mutationFn: (id: any) => articles.publicCommentDelete(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    usePublicCommentLike: () => {
      return useMutation({
        mutationFn: (id: any) => articles.publicCommentLike(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
    usePublicCommentReport: () => {
      return useMutation({
        mutationFn: (id: any) => articles.publicCommentReport(id),
        onSuccess: () => {
          queryClient.invalidateQueries(["articles"]);
        },
      });
    },
  };
};

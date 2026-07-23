import { shareArticle } from "@/lib/shareHandler";
import axiosInstance from "@/services/axios";

export const articleApi = () => {
  return {
  fetchArticles: async ({ page, per_page,search,status }: { page: number; per_page: number,search?:string,status?:string }) => {
  try {
    const response = await axiosInstance.get("/admin/articles",{
      params: { page, per_page,search,status }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    }

    if (error.request) {
      throw {
        message: "Unable to connect to the server. Please try again later.",
      };
    }

    throw {
      message: error.message || "Something went wrong.",
    };
  }
},
    createArticle:async (data) => {
      try {
        const response = await axiosInstance.post("/admin/articles",data);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    updateArticle: async (id: any, data: any) => {
      try {
        const response = await axiosInstance.put(`/admin/articles/${id}`, data);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    statusUpdateArticle: async (id: any, data: any) => {
      try{
        const response = await axiosInstance.put(`/admin/articles/${id}/status`, data);
        return response.data;
      }
      catch (error: any) {
        throw error?.response?.data;
      }
    },
    deleteArticle: async (id: any) => {
      try {
        const response = await axiosInstance.delete(`/admin/articles/${id}`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    fetchPublicHeadlineArticles: async ({ page, per_page }: { page: number; per_page: number }) => {
      try {
        const response = await axiosInstance.get("/headline-news",{
          params: { page, per_page }
        });
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    fetchPublicFeedArticles: async ({ page, per_page,from_date,to_date,slug }: { page: number; per_page: number,from_date?:string,to_date?:string,slug?:string }) => {
      try {
        const response = await axiosInstance.get("/articles",{
          params: { page, per_page ,from_date,to_date,slug}
        });
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    fetchPublicLatestArticles: async ({ page, per_page }: { page: number; per_page: number }) => {
      try {
        const response = await axiosInstance.get("/articles/latest",{
          params: { page, per_page }
        });
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    fetchPublicArticlesByCategory: async ({ page, per_page,slug }: { page: number; per_page: number,slug?:string }) => {
      try {
        const response = await axiosInstance.get(`/articles/category/${slug}`,{
          params: { page, per_page ,slug}
        });
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    fetchPublicSingleArticle: async (slug: any) => {
      try {
        const response = await axiosInstance.get(`/articles/${slug}`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    searchPublicArticles: async ({page, per_page,search}: any) => {
      try {
        const response = await axiosInstance.get(`/articles/search`,{
          params: { page, per_page ,search}
        });
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    likeArticle: async (id: any) => {
      try {
        const response = await axiosInstance.post(`/viewer/articles/${id}/interact/like`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    dislikeArticle: async (id: any) => {
      try {
        const response = await axiosInstance.post(`/viewer/articles/${id}/interact/dislike`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    shareArticle: async ({id,platform}: any) => {
      try {
        console.log(id,platform)
        const response = await axiosInstance.post(`/viewer/articles/${id}/share`,{platform});
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    viewArticle: async (id: any) => {
      try {
        const response = await axiosInstance.post(`/articles/${id}/view`);
        console.log(response.data)
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    reportArticle: async (id: any) => {
      try {
        const response = await axiosInstance.post(`/viewer/articles/${id}/interact/report`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
     bookmarkArticle: async (id: any) => {
      try {
        const response = await axiosInstance.post(`/viewer/articles/${id}/interact/bookmark`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    }
  };
};

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
        console.log("API",data)
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
        console.log(response.data)
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
    }
  };
};

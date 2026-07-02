import axiosInstance from "@/services/axios";

export const articleApi = () => {
  return {
    fetchArticles: async () => {
      try {
        const response = await axiosInstance.get("/admin/articles");
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    createArticle:async () => {
      try {
        const response = await axiosInstance.post("/admin/articles");
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    updateArticle: () => {},
    deleteArticle: async (id: any) => {
      try {
        const response = await axiosInstance.delete(`/admin/articles/${id}`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  };
};

import axiosInstance from "@/services/axios";

export const categoriesApi = () => {
  return {
    fetchCategories: async () => {
      try {
        const response = await axiosInstance.get("/admin/category");
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    addCategory: async (data: any) => {
      try {
        const response = await axiosInstance.post("/admin/category", data);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    deleteCategory: async (id: any) => {
      try {
        const response = await axiosInstance.delete(`/admin/category/${id}`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  };
};

import axiosInstance from "@/services/axios";

export const categoriesApi = () => {
  return {
    fetchCategories: async ({ page, per_page,search }: { page: number; per_page: number,search?:string }) => {
      try {
        const response = await axiosInstance.get("/admin/category", {
          params: { page, per_page,search }
        });
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
    editCategory: async (id: any, data: any) => {
      try {
        const response = await axiosInstance.put(
          `/admin/category/${id}`,
          data
        );
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

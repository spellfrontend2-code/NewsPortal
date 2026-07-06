import axiosInstance from "@/services/axios";

export const tagsApi = () => {
  return {
    fetchTags: async ({ page, per_page,search }: { page: number; per_page: number,search?:string }) => {
      try {
        const response = await axiosInstance.get("/admin/tags", {
          params: { page, per_page,search },
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
    createTag: async (data: any) => {
      try {
        console.log(data)
        const response = await axiosInstance.post("/admin/tags", data);
        return response.data;
      } catch (error: any) {
        console.log(error)
        throw error?.response?.data;
      }
  },
  deleteTag: async (id: any) => {
      try {
        const response = await axiosInstance.delete(`/admin/tags/${id}`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
}
}}
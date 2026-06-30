import axiosInstance from "@/services/axios";

export const mediaApi = () => {
  return {
    addMedia: async (data: any) => {
      try {
        const formData = new FormData();

        formData.append("category", data.category);

        data.files.forEach((file: File) => {
          formData.append("files[]", file);
        });

        const response = await axiosInstance.post(
          "/admin/media/bulk-upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } catch (error: any) {
        console.log(error.response);
        throw error?.response?.data;
      }
    },
    fetchMedia: async () => {
      try {
        const response = await axiosInstance.get("/admin/media");
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  };
};
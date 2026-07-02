import axiosInstance from "@/services/axios";

export const mediaApi = () => {
  return {
    addBulkMedia: async (data: any) => {
      try {
        console.log("apidata",data);
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
    addMedia: async (data: any) => {
        try {
        console.log("apidata",data);
        const formData = new FormData();

        formData.append("category", data.category);

        data.files.forEach((file: File) => {
          formData.append("file", file);
        });

        const response = await axiosInstance.post(
          "/admin/media/upload",
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
    fetchMedia: async ({ search ,page,per_page}: { search?: string; page?: number; per_page?: number }) => {
      try {
           const response = await axiosInstance.get("/admin/media", {
      params: {
        search,
        page,
        per_page
      }
    });
        console.log("fetchMediaResponse", response.data);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    deleteMedia: async (id: any) => {
      try {
        const response = await axiosInstance.delete(`/admin/media/${id}`);
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  };
};
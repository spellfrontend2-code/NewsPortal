import axiosInstance from "@/services/axios";

export const advertisementsApi = () => {
  return {
    fetchAdvertisements: async ({
      page,
      per_page,
      search,
      status
    }: {
      page: number;
      per_page: number;
      search?: string;
      status?: string
    }) => {
      try {
        const response = await axiosInstance.get("/admin/advertisements", {
          params: { page, per_page, search,status },
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
    createAdvertisement: async (data: any) => {
      try {
        const response = await axiosInstance.post(
          "/admin/advertisements",
          data,
        );
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    updateAdvertisement: async (id: any, data: any) => {
      try {
        const response = await axiosInstance.put(
          `/admin/advertisements/${id}`,
          data,
        );
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    updateAdvertisementStatus: async (id: any, data: any) => {
      try {
        const response = await axiosInstance.put(
          `/admin/advertisements/${id}/status`,
          data,
        );
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    deleteAdvertisement: async (id: any) => {
      try {
        const response = await axiosInstance.delete(
          `/admin/advertisements/${id}`,
        );
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  };
};

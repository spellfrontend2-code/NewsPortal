import axiosInstance from "@/services/axios";

export const advertisementsApi = () => {
  return {
    fetchAdvertisements: async ({
      page,
      per_page,
      search,
      status,
      is_approved
    }: {
      page: number;
      per_page: number;
      search?: string;
      status?: string;
      is_approved?: boolean
    }) => {
      try {
        const response = await axiosInstance.get("/admin/advertisements", {
          params: { page, per_page, search,status,is_approved },
        });
        console.log(response.data)
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
    fetchSingleAdvertisement: async (id: any) => {
      try{
        const response = await axiosInstance.get(`/admin/advertisements/${id}`);
        return response.data;
      }catch(error:any){
        throw error?.response?.data;
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
    updateAdvertisementApproval: async (id: any) => {
      try {
        const response = await axiosInstance.patch(
          `/admin/advertisements/${id}/toggle-approval`,
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
    fetchPublicAdvertisements: async () => {
      try {
        const response = await axiosInstance.get("advertisements");
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
    trackPublicAdClick: async (advertisement_id: any) => {
      try {
        const response = await axiosInstance.post(
          `/advertisements/${advertisement_id}/click`,
        );
        return response.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  };
};

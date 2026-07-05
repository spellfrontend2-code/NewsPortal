import axiosInstance from "@/services/axios";

export const advertisementsApi=()=>{
    return {
        fetchAdvertisements: async ({ page, per_page,search }: { page: number; per_page: number,search?:string }) => {
            try {
                const response = await axiosInstance.get("/admin/advertisements", {
                  params: { page, per_page,search },
                });
                return response.data;
              } catch (error: any) {
                throw error?.response?.data;
              }
        },
        createAdvertisement: async (data: any) => {
            try {
              const response = await axiosInstance.post("/admin/advertisements", data);
              return response.data;
            } catch (error: any) {
              throw error?.response?.data;
            }
        },
        updateAdvertisement: async (id: any, data: any) => {
            try {
              const response = await axiosInstance.put(
                `/admin/advertisements/${id}`,
                data
              );
              return response.data;
            } catch (error: any) {
              throw error?.response?.data;
            }
        },
        deleteAdvertisement: async (id: any) => {
            try {
              const response = await axiosInstance.delete(`/admin/advertisements/${id}`);
              return response.data;
            } catch (error: any) {
              throw error?.response?.data;
            }
        },
    }
}
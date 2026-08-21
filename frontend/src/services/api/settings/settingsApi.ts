import axiosInstance from "@/services/axios";

export const settingsApi=()=>{
    return {
        fetchSettings: async () => {
            try {
                const response = await axiosInstance.get("/admin/company");
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        updateSettings:async({id,data}:any)=>{
            try {
                const response = await axiosInstance.post(`/admin/company/${id}`, data);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        fetchPublicSettings: async () => {
            try {
                const response = await axiosInstance.get("/company");
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
    }
}

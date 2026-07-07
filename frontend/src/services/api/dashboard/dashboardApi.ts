import axiosInstance from "@/services/axios";

export const dashboardApi=()=>{
    return{
        fetchDashboard: async () => {
            try {
                const response = await axiosInstance.get("/admin/dashboard");
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
    }
}
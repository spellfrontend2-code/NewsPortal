import axiosInstance from "@/services/axios";

export const iconApi=()=>{
    return{
        fetchIcons: async ({ page, per_page, search }: { page: number; per_page: number,search?:string }) => {
            try {
                const response = await axiosInstance.get("/admin/icon-library", {
                    params: { page, per_page,search },
                });
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        createIcon: async (data: any) => {
            try {
                const response = await axiosInstance.post("/admin/icon-library", data);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
    }
}
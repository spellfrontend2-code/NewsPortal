import axiosInstance from "@/services/axios";

export const permissionApi=()=>{
    return{
        fetchPermissions: async () => {
            try {
                const response = await axiosInstance.get("/admin/permissions");
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        fetchRoleBasedPermissions:async()=>{
            try {
                const response = await axiosInstance.get("/admin/roles");
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        }
    }
}
import axiosInstance from "@/services/axios";

export const userApi=()=>{
    return {
        fetchUsers:async()=>{
            try {
                const response = await axiosInstance.get("/admin/authors");
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        deleteUser:async(id:any)=>{
            try {
                const response = await axiosInstance.delete(`/admin/authors/${id}`);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        }
    }
}
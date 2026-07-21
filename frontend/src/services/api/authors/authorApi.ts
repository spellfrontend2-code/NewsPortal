import axiosInstance from "@/services/axios";

export const authorApi =()=> {
    return {
        fetchAuthors: async ({page,per_page,search,status}:{page:number,per_page:number,search?:string,status?:string}) => {
       try {
        const response =await axiosInstance.get("/admin/authors",{
params:{page,per_page,search,status}
       });
        return response.data;
    }
        catch (error: any) {
        throw error?.response?.data;
      }
    },
    deleteAuthors:async(id)=>{
        try {
            const response = await axiosInstance.delete(`/admin/authors/${id}`);
            return response.data;
        } catch (error: any) {
            throw error?.response?.data;
        }
    },
    createAuthor: async (data: any) => {
        try {
            const response = await axiosInstance.post("/admin/authors", data);
            return response.data;
        } catch (error: any) {
            throw error?.response?.data;
        }
    },
    updateAuthor: async (id: any, data: any) => {
        try {
          const response = await axiosInstance.post(`/admin/authors/${id}`, data);
            return response.data;
        } catch (error: any) {
            throw error?.response?.data;
        }
    },
    updateStatus: async (id: any, status: any) => {
        try {
         const updatedStatus=status==="active"?"activate":status==="suspended"?"suspend":"ban"
          const response = await axiosInstance.patch(`/admin/authors/${id}/${updatedStatus}`);
            return response.data;
        } catch (error: any) {
            throw error?.response?.data;
        }
    },

}
};
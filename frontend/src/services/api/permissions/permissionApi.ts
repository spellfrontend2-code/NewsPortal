import axiosInstance from "@/services/axios";

export const permissionApi=()=>{
    return{
        fetchPermissions: async () => {
            try {
                const response = await axiosInstance.get("/admin/permissions");
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
        fetchRoleBasedPermissions:async()=>{
            try {
                const response = await axiosInstance.get("/admin/roles");
                return response.data;
            } catch (error: any) {
    throw error;
  }
        },
        assignRoleBasedPermissions:async(data)=>{
            try {
                const response = await axiosInstance.post("/admin/roles/assign-permissions",data);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        fetchUserBasedPermissions:async()=>{
            try {
                const response = await axiosInstance.get("/admin/users");
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        assignUserBasedPermissions:async(data)=>{
            try {
                const response = await axiosInstance.post("/admin/users/assign-permissions",data);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        createRole:async(data)=>{
            try {
                const response = await axiosInstance.post("/admin/add-role",data);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
        deleteRole:async(id)=>{
            try {
                const response = await axiosInstance.delete(`/admin/roles/${id}`);
                return response.data;
            } catch (error: any) {
                throw error?.response?.data;
            }
        },
    }
}
import { useAuthStore } from "@/context/useAuthStore";


export function usePermission(){

const {
 authData
}=useAuthStore();


const permissions =
 authData?.permissions ?? [];


function hasPermission(
 permission:string
){
return permissions.includes(permission);

}


return {
 hasPermission
};

}
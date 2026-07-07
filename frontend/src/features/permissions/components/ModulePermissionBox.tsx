import {
  PERMISSIONS,
  type ModuleName,
} from "@/features/auth/constants/permissions";


const moduleNames = Object.keys(PERMISSIONS) as ModuleName[];


function ModulePermissionBox({
  role,
  selectedPermissions,
  setSelectedPermissions
}) {


  const handlePermissionChange = (permission:string) => {

    setSelectedPermissions((prev)=>{

      if(prev.includes(permission)){
        return prev.filter((item)=>item !== permission);
      }

      return [
        ...prev,
        permission
      ];

    });

  };


  return (
    <div className="w-full h-screen">

      <div className="flex flex-col gap-3">

        {moduleNames.map((moduleName)=>(

          <div
            key={moduleName}
            className="flex gap-5 bg-gray-200 rounded-xl p-10"
          >

            <div className="text-lg font-bold w-1/4">
              {moduleName}
            </div>


            <div className="w-3/4 grid grid-cols-4 gap-5 p-2">

              {Object.entries(PERMISSIONS[moduleName])
              .map(([action, permission])=>(

                <div
                  key={permission}
                  className="text-sm flex gap-2 items-center justify-center"
                >

                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission)}
                    onChange={()=>handlePermissionChange(permission)}
                    className="accent-violet-500"
                  />

                  {action}

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}


export default ModulePermissionBox;
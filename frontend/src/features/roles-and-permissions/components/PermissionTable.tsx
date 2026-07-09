import { useMemo } from "react";
import { usePermissionHooks } from "@/features/permissions/hooks/usePermissions";

interface Permission {
  id: number;
  name: string;
}

interface PermissionTableProps {
  selectedPermissions: number[];
  setSelectedPermissions: (permissions: number[]) => void;
}

function PermissionTable({
  selectedPermissions,
  setSelectedPermissions,
}: PermissionTableProps) {
  const permissionHook = usePermissionHooks();
  const { data: permissions } = permissionHook.useFetchPermissions();

  const PERMISSIONS = permissions?.data ?? {};

  type ModuleName = keyof typeof PERMISSIONS;

  const modules = useMemo(
    () => Object.keys(PERMISSIONS) as ModuleName[],
    [PERMISSIONS],
  );

  const actions = useMemo(() => {
    const set = new Set<string>();

    modules.forEach((module) => {
      Object.keys(PERMISSIONS[module]).forEach((action) => set.add(action));
    });

    return Array.from(set);
  }, [modules, PERMISSIONS]);

  const allPermissions = useMemo(() => {
    return modules.flatMap(
      (module) => Object.values(PERMISSIONS[module]) as Permission[],
    );
  }, [modules, PERMISSIONS]);

  // Select all permissions
  const isAllSelected =
    allPermissions.length > 0 &&
    allPermissions.every((permission) =>
      selectedPermissions.includes(permission.id),
    );

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(allPermissions.map((permission) => permission.id));
    }
  };

  // Select all CREATE / UPDATE / DELETE etc.
  const handleActionSelect = (action: string) => {
    const actionPermissions = modules
      .map(
        (module) =>
          PERMISSIONS[module][
            action as keyof (typeof PERMISSIONS)[ModuleName]
          ] as Permission | undefined,
      )
      .filter(Boolean) as Permission[];

    const actionIds = actionPermissions.map((permission) => permission.id);

    const isSelected = actionIds.every((id) =>
      selectedPermissions.includes(id),
    );

    if (isSelected) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => !actionIds.includes(id)),
      );
    } else {
      setSelectedPermissions([
        ...new Set([...selectedPermissions, ...actionIds]),
      ]);
    }
  };

  // Single permission checkbox
  const togglePermission = (permission: Permission) => {
    if (selectedPermissions.includes(permission.id)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permission.id),
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permission.id]);
    }
  };

  return (
    <div className="border rounded-lg overflow-auto border-[var(--color-secondary)]">
      {/* Select All */}
      <div className="p-4 border-b border-[var(--color-secondary)] bg-gray-50 flex gap-2 items-center">
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={handleSelectAll}
          className="h-4 w-4 accent-[rgb(var(--color-primary-rgb)/0.7)]"
        />

        <span className="font-semibold text-gray-600">Select All Permissions</span>
      </div>

      <table className="w-full border-collapse text-sm font-semibold text-gray-600">
        <thead>
          <tr className="border-b border-[var(--color-secondary)] bg-gray-100 ">
            <th className="p-3 text-left font-semibold">Module</th>

            {actions.map((action) => {
              const actionPermissions = modules
                .map(
                  (module) =>
                    PERMISSIONS[module][
                      action as keyof (typeof PERMISSIONS)[ModuleName]
                    ] as Permission | undefined,
                )
                .filter(Boolean) as Permission[];

              const actionSelected =
                actionPermissions.length > 0 &&
                actionPermissions.every((permission) =>
                  selectedPermissions.includes(permission.id),
                );

              return (
                <th key={action} className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="checkbox"
                      checked={actionSelected}
                      onChange={() => handleActionSelect(action)}
                      className="h-4 w-4 accent-[rgb(var(--color-primary-rgb)/0.7)]"
                    />

                    <span className="capitalize font-semibold">{action.toLowerCase()}</span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {modules.map((module) => (
            <tr key={module} className="border-b border-[var(--color-secondary)]">
              <td className="p-3 font-semibold">{module}</td>

              {actions.map((action) => {
                const permission = PERMISSIONS[module][
                  action as keyof (typeof PERMISSIONS)[ModuleName]
                ] as Permission | undefined;

                return (
                  <td key={action} className="p-3 text-center">
                    {permission ? (
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => togglePermission(permission)}
                        className="h-4 w-4 accent-[rgb(var(--color-primary-rgb)/0.7)]"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PermissionTable;

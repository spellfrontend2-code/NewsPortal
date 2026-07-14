import {
  Book,
  House,
  Camera,
  ChartColumnStacked,
  Newspaper,
  Tags,
  Settings,
  Lock,
  LogOut,
  UserCircle,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../../assets/hero.png";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { useAuthHooks } from "@/features/auth/hooks/useAuth";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { usePermissionStore } from "@/features/roles-and-permissions/hooks/usePermissionStore";
import { useAuthStore } from "@/context/useAuthStore";
function Sidebar() {
  const { clearAuth } = useAuthStore();
  const { hasPermission } = usePermission();
  const { PERMISSIONS, isLoading: permissionLoading } = usePermissionStore();
  const navItems = [
    {
      label: "Dashboard",
      icon: House,
      path: "/admin",
      permissions: [PERMISSIONS?.DASHBOARD?.VIEW?.name],
    },

    {
      label: "Articles",
      icon: Newspaper,
      path: "/admin/articles",
      permissions: [
        PERMISSIONS?.ARTICLE?.VIEW?.name,
        PERMISSIONS?.ARTICLE?.CREATE?.name,
        PERMISSIONS?.ARTICLE?.UPDATE?.name,
        PERMISSIONS?.ARTICLE?.DELETE?.name,
      ],
    },

    {
      label: "Media Gallery",
      icon: Camera,
      path: "/admin/media",
      permissions: [
        PERMISSIONS?.MEDIA?.VIEW?.name,
        PERMISSIONS?.MEDIA?.CREATE?.name,
        PERMISSIONS?.MEDIA?.DELETE?.name,
      ],
    },

    {
      label: "Advertisements",
      icon: Book,
      path: "/admin/advertisements",
      permissions: [
        PERMISSIONS?.ADS?.VIEW?.name,
        PERMISSIONS?.ADS?.CREATE?.name,
        PERMISSIONS?.ADS?.UPDATE?.name,
        PERMISSIONS?.ADS?.DELETE?.name,
      ],
    },
    {
      label: "Categories",
      icon: ChartColumnStacked,
      path: "/admin/categories",
      permissions: [
        PERMISSIONS?.CATEGORY?.VIEW?.name,
        PERMISSIONS?.CATEGORY?.CREATE?.name,
        PERMISSIONS?.CATEGORY?.UPDATE?.name,
        PERMISSIONS?.CATEGORY?.DELETE?.name,
      ],
    },

    {
      label: "Tags",
      icon: Tags,
      path: "/admin/tags",
      permissions: [
        PERMISSIONS?.TAG?.VIEW?.name,
        PERMISSIONS?.TAG?.CREATE?.name,
        PERMISSIONS?.TAG?.UPDATE?.name,
        PERMISSIONS?.TAG?.DELETE?.name,
      ],
    },
    // {
    //   label: "Users",
    //   icon: Users,
    //   path: "/admin/users",
    //   permissions: [
    //     PERMISSIONS?.USER?.VIEW?.name,
    //     PERMISSIONS?.USER?.CREATE?.name,
    //     PERMISSIONS?.USER?.UPDATE?.name,
    //     PERMISSIONS?.USER?.DELETE?.name,
    //   ],
    // },
    {
      label: "Authors",
      icon: Lock,
      path: "/admin/authors",
      permissions: [
        PERMISSIONS?.USER?.VIEW?.name,
        PERMISSIONS?.USER?.CREATE?.name,
        PERMISSIONS?.USER?.UPDATE?.name,
        PERMISSIONS?.USER?.DELETE?.name,
        PERMISSIONS?.USER?.ACTIVATE?.name,
      ],
    },
    {
      label: "Roles And Permissions",
      icon: Lock,
      path: "/admin/roles-and-permissions",
      permissions: [
        PERMISSIONS?.PERMISSION?.VIEW?.name,
        PERMISSIONS?.PERMISSION?.ASSIGN?.name,
      ],
    },

    {
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
      permissions: [
        PERMISSIONS?.COMPANY?.VIEW?.name,
        PERMISSIONS?.COMPANY?.UPDATE?.name,
      ],
    },
  ];
  const navigate = useNavigate();
  const authHook = useAuthHooks();
  const logout = authHook?.useLogout();
  const { data: profile } = authHook?.useFetchProfile();
  const profileData = profile?.data ?? [];
  const filteredNavItems = permissionLoading
    ? []
    : navItems.filter((item) => {
        if (!item.permissions) return true;

        return item.permissions.some(
          (permission) => permission && hasPermission(permission),
        );
      });
  const handleLogout = () => {
    logout.mutate(
      {},
      {
        onSuccess: () => {
          clearAuth();
          toast.success("Logged out successfully");

          navigate("/admin/login", {
            replace: true,
          });
        },
        onError: () => {
          clearAuth();
          navigate("/admin/login", { replace: true });
        },
      },
    );
  };
  const location = useLocation();
  //   const {authData}=useAuthStore();
  //   const user=authData?.user
  //   const [languageOpen, setLanguageOpen] = useState(false);
  //   const [currencyOpen, setCurrencyOpen] = useState(false);
  //   const [selectedLanguage, setSelectedLanguage] = useState(Languages[0]?.value);
  //   const [selectedCurrency, setSelectedCurrency] = useState(Currencies[0]);
  //   const [menuOpen, setMenuOpen] = useState(false);
  //   const CurrencyIcon = selectedCurrency?.symbol;
  //   const navigate=useNavigate()
  //   const handleLogout=()=>{
  //     localStorage?.removeItem("auth");
  //     toast?.success("Logged out successfully");
  //     navigate("/login");
  //   }
  return (
    <div
      className={`relative h-screen w-[280px] overflow-auto transition-all duration-300 shadow-lg `}
    >
      <nav
        className={`relative flex flex-col justify-between  overflow-y-auto scrollbar-none transition-all duration-300 w-full h-screen`}
      >
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} className="w-10" />

            <span
              className={`text-2xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300 w-auto opacity-100 text-[var(--color-primary)]`}
            >
              News Portal
            </span>
          </Link>
          <hr className="my-4 border-t border-gray-300" />
          <section className="space-y-1.5 flex flex-col w-full ">
            {filteredNavItems?.map((item) => {
              const isActive = location?.pathname === item?.path ? true : false;
              return (
                <Link key={item?.label} to={item?.path}>
                  <div
                    className={`relative w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-semibold group  ${isActive ? "bg-gray-300/20 text-[var(--color-primary)]" : "hover:bg-gray-100/30 text-gray-500 hover:text-[var(--color-primary)] "}`}
                    title={item?.label}
                  >
                    <item.icon
                      size={20}
                      strokeWidth={2.5}
                      className={`shrink-0  transition-colors`}
                    />

                    <span
                      className={`whitespace-nowrap  transition-all duration-300`}
                    >
                      {item?.label}
                    </span>

                    {isActive && (
                      <div className="absolute inset-0 w-[5px] h-full rounded-l-full bg-[rgb(var(--color-primary-rgb)/0.8)]" />
                    )}
                  </div>
                </Link>
              );
            })}
          </section>
          <hr className="my-4 border-t border-gray-300" />
        </div>
        <div className="flex flex-col gap-3 w-full my-3">
          <Link key={profileData.name} to="/admin/profile">
            <p className="px-3 flex items-center gap-2">
              <UserCircle />
              {profileData.name}
            </p>
          </Link>
          <div className="w-full flex ">
            <Button
              className="w-full"
              onClick={handleLogout}
              disabled={logout.isPending}
            >
              <div
                className={`flex items-center cursor-pointer gap-3 px-3 py-2.5 rounded-xl font-semibold 
              whitespace-nowrap overflow-hidden transition-all duration-300  opacity-100 bg-red-600/70 text-white
               hover:bg-red-600 hover:text-white w-full`}
              >
                <LogOut
                  size={20}
                  strokeWidth={2.5}
                  className={`shrink-0  transition-colors`}
                />
                {logout.isPending ? "Logging Out..." : "Log Out"}
              </div>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Sidebar;

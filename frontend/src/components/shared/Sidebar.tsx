import {
  Book,
  House,
  Camera,
  ChartColumnStacked,
  Newspaper,
  Tags,
  Settings,
  Users,
  ChevronDown,
  Lock,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../../assets/hero.png";
import { PERMISSIONS } from "@/features/auth/constants/permissions";
import { usePermission } from "@/features/auth/hooks/usePermission";
import { useAuthHooks } from "@/features/auth/hooks/useAuth";
import { Button } from "../ui/button";
import { toast } from "sonner";
const navItems = [
  {
    label: "Dashboard",
    icon: House,
    path: "/admin",
  },

  {
    label: "Categories",
    icon: ChartColumnStacked,
    path: "/admin/categories",
    permissions: [
      PERMISSIONS.CATEGORY.VIEW,
      PERMISSIONS.CATEGORY.CREATE,
      PERMISSIONS.CATEGORY.UPDATE,
      PERMISSIONS.CATEGORY.DELETE,
    ],
  },

  {
    label: "Tags",
    icon: Tags,
    path: "/admin/tags",
    permissions: [
      PERMISSIONS.TAG.VIEW,
      PERMISSIONS.TAG.CREATE,
      PERMISSIONS.TAG.UPDATE,
      PERMISSIONS.TAG.DELETE,
    ],
  },

  {
    label: "Articles",
    icon: Newspaper,
    path: "/admin/articles",
    permissions: [
      PERMISSIONS.ARTICLE.VIEW,
      PERMISSIONS.ARTICLE.CREATE,
      PERMISSIONS.ARTICLE.UPDATE,
      PERMISSIONS.ARTICLE.DELETE,
    ],
  },

  {
    label: "Media Gallery",
    icon: Camera,
    path: "/admin/media",
    permissions: [
      PERMISSIONS.MEDIA.VIEW,
      PERMISSIONS.MEDIA.CREATE,
      PERMISSIONS.MEDIA.DELETE,
    ],
  },

  {
    label: "Advertisements",
    icon: Book,
    path: "/admin/advertisements",
    permissions: [
      PERMISSIONS.ADS.VIEW,
      PERMISSIONS.ADS.CREATE,
      PERMISSIONS.ADS.UPDATE,
      PERMISSIONS.ADS.DELETE,
    ],
  },

  {
    label: "Users",
    icon: Users,
    path: "/admin/users",
    permissions: [
      PERMISSIONS.USER.VIEW,
      PERMISSIONS.USER.CREATE,
      PERMISSIONS.USER.UPDATE,
      PERMISSIONS.USER.DELETE,
    ],
  },
{
  label:"Authors",
  icon:Lock,
  path:"/admin/authors",
  permissions:[]
},
  {
    label: "Roles And Permissions",
    icon: Lock,
    path: "/admin/roles-and-permissions",
    permissions: [PERMISSIONS.PERMISSION.VIEW, PERMISSIONS.PERMISSION.ASSIGN],
  },

  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
    permissions: [PERMISSIONS.COMPANY.VIEW, PERMISSIONS.COMPANY.UPDATE],
  },
];

function Sidebar() {
  const { hasPermission } = usePermission();
  const navigate=useNavigate()
  const authHook=useAuthHooks()
  const logout=authHook.useLogout();
  const filteredNavItems = navItems.filter((item) => {
    if (!item.permissions) return true;

    return item.permissions?.map((permission) => hasPermission(permission));
  });
const handleLogout=()=>{
  logout.mutate({},{
    onSuccess:()=>{
      localStorage.removeItem("auth");
      toast.success("Logged out successfully");
      navigate("/admin/login");
  }})
}
  const location = useLocation();
  //   const {authData}=useAuthStore();
  //   const user=authData?.user
  //   const [languageOpen, setLanguageOpen] = useState(false);
  //   const [currencyOpen, setCurrencyOpen] = useState(false);
  //   const [selectedLanguage, setSelectedLanguage] = useState(Languages[0].value);
  //   const [selectedCurrency, setSelectedCurrency] = useState(Currencies[0]);
  //   const [menuOpen, setMenuOpen] = useState(false);
  //   const CurrencyIcon = selectedCurrency.symbol;
  //   const navigate=useNavigate()
  //   const handleLogout=()=>{
  //     localStorage.removeItem("auth");
  //     toast.success("Logged out successfully");
  //     navigate("/login");
  //   }
  return (
    <div
      className={`relative h-screen w-[260px] transition-all duration-300 shadow-lg `}
    >
      <nav
        className={`relative flex flex-col p-4  overflow-y-auto scrollbar-none transition-all duration-300 w-full h-screen`}
      >
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
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path ? true : false;
            return (
              <Link key={item.label} to={item.path}>
                <div
                  className={`relative w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-semibold group  ${isActive ? "bg-gray-300/20 text-[var(--color-primary)]" : "hover:bg-gray-100/30 text-gray-500 hover:text-[var(--color-primary)] "}`}
                  title={item.label}
                >
                  <item.icon
                    size={20}
                    strokeWidth={2.5}
                    className={`shrink-0  transition-colors`}
                  />

                  <span
                    className={`whitespace-nowrap  transition-all duration-300`}
                  >
                    {item.label}
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
        <Button className="flex items-center gap-2" onClick={handleLogout}>
          <span
            className={`flex items-center cursor-pointer gap-3 px-3 py-2.5 rounded-xl font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 w-full opacity-100 bg-red-600/70 text-white hover:bg-red-600 hover:text-white`}
          >
            <LogOut
              size={20}
              strokeWidth={2.5}
              className={`shrink-0  transition-colors`}
            />
            Log Out
          </span>
        </Button>
      </nav>
    </div>
  );
}
export default Sidebar;

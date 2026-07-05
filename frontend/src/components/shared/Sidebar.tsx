import {
  Book,
  House,
  Camera,
ChartColumnStacked,
Newspaper,
  Tags,
  Settings,

} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/hero.png"

const navItems = [
  { label: "Dashboard", icon: House, path: "/admin" },
  { label: "Categories", icon: ChartColumnStacked, path: "/admin/categories" },
    { label: "Tags", icon: Tags, path: "/admin/tags" },

  { label: "Articles", icon: Newspaper, path: "/admin/articles" },
  { label: "Media Gallery", icon: Camera, path: "/admin/media" },
  { label: "Advertisements", icon: Book, path: "/admin/advertisements" },
  {label:"Settings",icon:Settings,path:"/admin/settings"},
  // { label: "Blog", icon: BookOpen, path: "/blogs" },
  // { label: "About", icon: Users, path: "/about" },
];


function Sidebar() {
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
      className={`relative h-screen w-[250px] transition-all duration-300 shadow-lg `}
    >
  
        <nav
          className={`relative flex flex-col p-4  overflow-y-auto scrollbar-none transition-all duration-300 w-full h-screen`}
        >
          <Link to="/" className="flex items-center gap-2" >
            <img src={Logo} className="w-10" />

            <span
              className={`text-2xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300 w-auto opacity-100 text-[var(--color-primary)]`}
            >
                News Portal           
             </span>
          </Link>
          <hr className="my-4 border-t border-gray-300" />
          <section className="space-y-1.5 flex flex-col w-full ">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ? true : false;
              return (
                <Link
                  key={item.label}
                  to={item.path} 
                >
                  <div
                    className={`relative w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-semibold group  ${isActive ? "bg-gray-300/20 text-[var(--color-primary)]" : "hover:bg-gray-100/30 text-gray-500 hover:text-[var(--color-primary)] "}`}
                    title={item.label}
                  >
                    <item.icon
                      size={20}
                      strokeWidth={ 2.5}
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

    
       
        </nav>
    
    </div>
  );
}
export default Sidebar;

import { useAuthStore } from "@/context/useAuthStore";
import UserLogin from "@/features/auth/components/userLogin";
import { useAuthHooks } from "@/features/auth/hooks/useAuth";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { useProfileHooks } from "@/features/profile/hooks/useProfile";
import { Search, UserCircle } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";


function NavbarCategories() {
  const {setAuthData}=useAuthStore()
  const profileHook=useProfileHooks()
  const {data:profile,isLoading:profileLoading}=profileHook.useFetchProfile()
const profileData=profile?.data??[];
  const categoryHook = useCategoriesHooks();
  const [loginOpen,setLoginOpen]=useState(false)
  const {
    data: CategoryList,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = categoryHook.useFetchPublicCategories();
  const categories = CategoryList?.data ?? [];
  const [profileInfoOpen, setProfileInfoOpen] = useState(false);
  const updatedCategories = [{ id: 0, name: "Home", slug: "" }, ...categories];
  const authHook=useAuthHooks()
  const logout=authHook.useLogout()
const handleLogout=()=>{
logout.mutate({},{
  onSuccess:(res) => {
    setAuthData({})
    toast.success(res?.message||"Logged out successfully")
}})
}
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-[50px] w-full justify-between bg-[var(--color-public-primary)] px-30">
        <div className="flex w-[70%] items-center justify-between">
          {updatedCategories.map((category) => (
            <NavLink
              key={category.id}
              to={
                category.slug === ""
                  ? "/"
                  : `/news-list/category/${category.slug}`
              }
              className={({ isActive }) =>
                `inline-block p-3 font-semibold uppercase transition-colors ${
                  isActive
                    ? "text-[var(--color-public-navtext)]"
                    : "text-[rgb(var(--color-public-navtext-rgb)/0.8)]"
                } hover:text-[var(--color-public-navtext)]`
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>

        <div className="flex h-full w-[20%] items-center justify-end gap-3">
          <div className="flex h-[60%] items-center gap-2 rounded-2xl border-2 border-[var(--color-secondary)] p-2">
            <Search
              size={18}
              strokeWidth={2}
              color="var(--color-public-navtext)"
            />

            <input
              className="border-none bg-[var(--color-public-primary)] text-[var(--color-public-navtext)] outline-none"
              placeholder="Search"
            />
          </div>

          <div>
          {
          profileData.id?
          <div className="relative h-8 w-8 rounded-full bg-[rgb(var(--color-public-navtext-rgb)/0.3)] border border-[var(--color-public-navtext)]
           flex justify-center items-center font-bold text-xl text-[var(--color-public-navtext)] cursor-pointer" onClick={() => {setProfileInfoOpen(true)}} >
            {profileData?.name?.charAt(0)}
            {
              profileInfoOpen && <div className="absolute rounded-2xl top-8 w-[120px] h-[80px] flex flex-col gap-2 bg-[rgb(var(--color-public-newsText-rgb)/0.3)] p-2 font-semibold text-base">
                <p>My Profile</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
              }
            </div>
          :
                  <UserCircle color="white" size={30} className="cursor-pointer" onClick={() => {setLoginOpen(true)}}/>
}
        </div>
        </div>

        
      </div>
    <UserLogin open={loginOpen} onOpenChange={setLoginOpen}/>
    </div>
  );
}

export default NavbarCategories;

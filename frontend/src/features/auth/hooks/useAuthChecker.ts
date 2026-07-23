import { useAuthStore } from "@/context/useAuthStore";
import { useState } from "react";
import { toast } from "sonner";

export const useAuthChecker = () => {
  const { authData } = useAuthStore();
  const [open, setOpen] = useState(false);

  const checkAuth = (message: string) => {
    if (!authData?.accessToken) {
      setOpen(true);
      toast.error(message);
      return false;
    }

    return true;
  };

  return {
    checkAuth,
    open,
    setOpen,
  };
};
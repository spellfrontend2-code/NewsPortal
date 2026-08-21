import { createContext, useContext, useState } from "react";
const initialAuth = {
  user: null,
  permissions: [],
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  role: null,
};

const AuthContext = createContext<any>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authData, setAuthDataState] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : initialAuth;
  });

  const setAuthData = (data: any) => {
    setAuthDataState(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };
  const clearAuth = () => {
    setAuthDataState(initialAuth);
    localStorage.removeItem("auth");
  };
  return (
    <AuthContext.Provider value={{ authData, setAuthData, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthStore() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

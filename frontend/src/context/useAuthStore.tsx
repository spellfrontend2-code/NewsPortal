import { createContext, useContext, useEffect, useState } from "react";
const initialAuth = {
  user: null,
  permissions: [],
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  role: null,
};

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authData, setAuthDataState] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : initialAuth;
  });

  const setAuthData = (data) => {
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

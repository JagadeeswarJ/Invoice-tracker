import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { UserToken } from "../utils/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
  loading: boolean;
  checkAuth: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = () => {
    setLoading(true);
    const storedToken = localStorage.getItem(UserToken);
    if (storedToken) {
      const token = JSON.parse(atob(storedToken.split(".")[1]));
      if (token.exp < Date.now() / 1000) {
        logout();
      } else {
        navigate("/registrations");
        setToken(storedToken);
      }
    } else {
      logout();
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem(UserToken);
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, logout, loading, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider };

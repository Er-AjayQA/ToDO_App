import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [companyId, setCompanyId] = useState(
    localStorage.getItem("companyId") || null
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const login = (id, userDetails, token) => {
    setCompanyId(id);
    setUser(userDetails);
    setToken(token);
    localStorage.setItem("companyId", id);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setUser(null);
    setCompanyId(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("companyId");
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{ companyId, user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

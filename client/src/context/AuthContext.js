import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = '/portfolio-fdme/server/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const res = await axios.get(`${API_URL}/check_session.php`, { withCredentials: true });
      setIsAdmin(res.data.admin);
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { checkSession(); }, []);

  const logout = async () => {
    await axios.post(`${API_URL}/logout.php`, {}, { withCredentials: true });
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (savedUser) setUser(savedUser);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password, role = 'customer') => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'https://rg-digital-studio.onrender.com'}/api/auth/register`, { name, email, password, role });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

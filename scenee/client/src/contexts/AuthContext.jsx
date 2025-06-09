import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserProfile } from '../api/userApi';
import { logoutUser } from '../api/authApi';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const token =
        localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY) ||
        sessionStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetchUserProfile();
        setUser(response.data);
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (token, saveTo = 'local') => {
    if (saveTo === 'session') {
      sessionStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, token);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, token);
    }

    try {
      const res = await fetchUserProfile();
      setUser(res.data);
    } catch (err) {
      console.error('로그인 후 유저 불러오기 실패:', err);
    }
  };

  const logout = () => {
    logoutUser();
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
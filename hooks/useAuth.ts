import { useState, useEffect } from 'react';
import { User } from '@/types';
import { authUtils } from '@/utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authenticated = await authUtils.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const currentUser = await authUtils.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const loggedInUser = await authUtils.login(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleSignup = async (username: string, email: string, password: string) => {
    const newUser = await authUtils.signup(username, email, password);
    if (newUser) {
      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    await authUtils.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const continueAsGuest = () => {
    const guestUser = authUtils.continueAsGuest();
    setUser(guestUser);
    setIsAuthenticated(false);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    continueAsGuest,
  };
};


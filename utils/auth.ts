import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { dummyUsers } from '@/constants/dummyData';

const AUTH_KEY = '@lofio_auth';
const USER_KEY = '@lofio_user';

export const authUtils = {
  // Login with dummy validation
  login: async (email: string, password: string): Promise<User | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dummy validation - accept any email/password combination
    const user = dummyUsers.find(u => u.email === email) || dummyUsers[0];
    
    if (user) {
      await AsyncStorage.setItem(AUTH_KEY, 'true');
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    }
    
    return null;
  },

  // Signup with dummy validation
  signup: async (username: string, email: string, password: string): Promise<User | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new dummy user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      avatar: '👤',
      createdAt: new Date().toISOString(),
      isGuest: false,
    };
    
    await AsyncStorage.setItem(AUTH_KEY, 'true');
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  // Logout
  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem(AUTH_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const auth = await AsyncStorage.getItem(AUTH_KEY);
    return auth === 'true';
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    const userStr = await AsyncStorage.getItem(USER_KEY);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Continue as guest
  continueAsGuest: (): User => {
    return dummyUsers.find(u => u.isGuest) || dummyUsers[2];
  },
};


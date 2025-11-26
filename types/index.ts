export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  isGuest: boolean;
}

export interface Logo {
  id: string;
  title: string;
  category: string;
  svgData: string;
  colors: string[];
  createdBy: string;
  createdAt: string;
  likes: number;
  isPublished: boolean;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  previewImage: string;
  svgData: string;
  isPremium: boolean;
}

export type Category = 'Tech' | 'Food' | 'Fashion' | 'Abstract' | 'Minimal' | 'All';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}


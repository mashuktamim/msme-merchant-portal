import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User, Permission } from '@/types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // Optional: clear local storage if needed, though persist handles it
      },

      hasPermission: (permission: Permission) => {
        const { user } = get();
        if (!user) return false;
        // Basic implementation: check if permission exists in user's permissions array
        return user.permissions.includes(permission);
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

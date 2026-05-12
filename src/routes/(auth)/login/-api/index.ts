import type { LoginInput } from '../-types';
import type { User } from '@/types/auth';

/**
 * Mock login API call.
 * In a real app, this would use axiosClient.post('/auth/login')
 */
export const loginRequest = async (data: LoginInput): Promise<{ user: User; token: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock successful response
  if (data.email === 'admin@example.com' && data.password === 'password') {
    return {
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        permissions: ['view:dashboard', 'manage:posts', 'manage:users', 'view:settings'],
      },
      token: 'mock-admin-token',
    };
  }

  if (data.email === 'merchant@example.com' && data.password === 'password') {
    return {
      user: {
        id: '2',
        email: 'merchant@example.com',
        name: 'Merchant User',
        role: 'merchant',
        permissions: ['view:dashboard', 'manage:posts'],
      },
      token: 'mock-merchant-token',
    };
  }

  throw new Error('Invalid email or password');
};

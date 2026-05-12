export type Role = 'admin' | 'merchant' | 'user';

export type Permission =
  | 'view:dashboard'
  | 'manage:posts'
  | 'manage:users'
  | 'view:analytics'
  | 'view:settings';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

import type { ReactNode } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import type { Permission } from '@/types/auth';

interface PermissionGuardProps {
  children: ReactNode;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

/**
 * A guard component that only renders its children if the user has the required permissions.
 */
export function PermissionGuard({
  children,
  permissions = [],
  requireAll = false,
  fallback = null,
}: PermissionGuardProps) {
  const hasPermission = useAuthStore((state) => state.hasPermission);

  if (permissions.length === 0) {
    return <>{children}</>;
  }

  const hasAccess = requireAll
    ? permissions.every((p) => hasPermission(p))
    : permissions.some((p) => hasPermission(p));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

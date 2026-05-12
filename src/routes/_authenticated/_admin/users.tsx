import { EmptyState } from '@/components/common/EmptyState';
import { createFileRoute } from '@tanstack/react-router';
import { Users } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/_admin/users')({
  component: UsersPage,
});

function UsersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 p-8 border-2 border-dashed rounded-xl border-muted">
      <EmptyState
        icon={Users}
        title="User Management"
        description="This feature is coming soon. You will be able to manage merchant accounts and roles here."
      />
    </div>
  );
}

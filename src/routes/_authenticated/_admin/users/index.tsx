import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_admin/users/')({
  component: AdminUsersPage,
});

function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">User Management</h3>
      <p className="text-muted-foreground">
        This page is only accessible to users with the 'admin' role.
      </p>
      <div className="rounded-lg border bg-card p-8 text-center">
        <p>User list will be displayed here.</p>
      </div>
    </div>
  );
}

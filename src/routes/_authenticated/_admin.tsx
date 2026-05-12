import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_admin')({
  beforeLoad: ({ context }) => {
    if (context.auth.user?.role !== 'admin') {
      throw redirect({
        to: '/unauthorized',
      });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-primary">Admin Control Center</h2>
      </div>
      <Outlet />
    </div>
  );
}

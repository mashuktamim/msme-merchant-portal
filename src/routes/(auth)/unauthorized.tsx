import { createFileRoute, Link } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/(auth)/unauthorized')({
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-6 text-destructive">
        <ShieldAlert size={64} />
      </div>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">Access Denied</h1>
      <p className="mb-8 max-w-125 text-lg text-muted-foreground">
        You do not have the required permissions to view this page. If you believe this is an error, please contact your administrator.
      </p>
      <div className="flex gap-4">
        <Button variant="outline">
          <Link to="/">Go to Dashboard</Link>
        </Button>
        <Button>
          <Link to="/login">Login with different account</Link>
        </Button>
      </div>
    </div>
  );
}

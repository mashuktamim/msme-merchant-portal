import { createFileRoute } from '@tanstack/react-router';
import { Settings } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 p-8 border-2 border-dashed rounded-xl border-muted">
      <EmptyState
        icon={Settings}
        title="Settings"
        description="Configuration and account settings will be available here soon."
      />
    </div>
  );
}

import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
      <div className="p-4 rounded-full bg-primary/10">
        <Icon className="size-10 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useEffect } from 'react';

export function GlobalError({ error }: { error: Error }) {
  const router = useRouter();
  const { reset } = useQueryErrorResetBoundary();

  useEffect(() => {
    // Reset the query cache when the error component is mounted
    reset();
  }, [reset]);

  const handleRetry = () => {
    router.invalidate();
  };

  return (
    <div className="flex min-h-100 w-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
        <AlertCircle className="h-10 w-10" />
      </div>
      
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
        Something went wrong
      </h2>
      
      <p className="max-w-100 text-muted-foreground mb-8 text-balance">
        {error.message || "An unexpected error occurred while processing your request. Please try again or contact support."}
      </p>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/'}
        >
          Go Home
        </Button>
        <Button 
          onClick={handleRetry}
          className="gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-8 max-w-full overflow-auto rounded-lg bg-muted p-4 text-left text-xs font-mono text-muted-foreground">
          {error.stack}
        </pre>
      )}
    </div>
  );
}

export function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-500 animate-in fade-in">
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">Loading</h3>
          <p className="text-sm text-muted-foreground animate-pulse">Preparing your experience...</p>
        </div>
      </div>
    </div>
  );
}

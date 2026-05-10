import { Outlet, createRootRouteWithContext, Link } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'

import '../styles.css'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
 }>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl text-primary">MSME Portal</span>
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link 
                to="/" 
                className="transition-colors hover:text-primary text-muted-foreground"
                activeProps={{ className: 'text-primary' }}
              >
                Home
              </Link>
              <Link 
                to="/posts" 
                className="transition-colors hover:text-primary text-muted-foreground"
                activeProps={{ className: 'text-primary' }}
              >
                Posts
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Login</Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <Toaster position="top-right" expand={true} richColors />
      
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  )
}

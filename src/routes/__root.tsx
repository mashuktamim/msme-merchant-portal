import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import '../styles.css'
import { GlobalLoader } from '@/components/common/GlobalLoader'
import { GlobalError } from '@/components/common/GlobalError'
import { NotFound } from '@/components/common/NotFound'

import type { AuthState } from '@/types/auth'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  auth: AuthState
}>()({
  component: RootComponent,
  pendingComponent: () => <GlobalLoader />,
  errorComponent: ({ error }) => <GlobalError error={error} />,
  notFoundComponent: () => <NotFound />,
})

function RootComponent() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
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
    </TooltipProvider>
  )
}

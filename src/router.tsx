import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import type { QueryClient } from '@tanstack/react-query'
import type { AuthState } from './types/auth'

export function createRouter(queryClient: QueryClient, auth?: AuthState) {
  return createTanStackRouter({
    routeTree,
    context: {
      queryClient,
      auth: auth!, // This will be provided by RouterProvider context prop
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}

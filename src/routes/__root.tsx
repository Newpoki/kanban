import { ThemeProvider } from '@/theme/theme-provider'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'

const RouterDevtools =
    import.meta.env.MODE === 'production'
        ? () => null
        : lazy(() =>
              // Lazy load in development
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              }))
          )

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <ThemeProvider>
            <Outlet />
            <Suspense>
                <RouterDevtools position="bottom-right" />
            </Suspense>
        </ThemeProvider>
    )
}

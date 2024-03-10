import { ThemeProvider } from '@/theme/theme-provider'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <ThemeProvider>
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" />
        </ThemeProvider>
    )
}

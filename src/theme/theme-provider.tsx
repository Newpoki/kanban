import { useEffect, useState } from 'react'
import { DEFAULT_THEME, Theme, ThemeProviderContext } from './use-theme'

type ThemeProviderProps = {
    children: React.ReactNode
    storageKey?: string
}

export function ThemeProvider({
    children,
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) ?? DEFAULT_THEME
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

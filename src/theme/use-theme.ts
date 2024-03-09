import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light'

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const DEFAULT_THEME = 'light'

const initialState: ThemeProviderState = {
    theme: DEFAULT_THEME,
    setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

    return context
}

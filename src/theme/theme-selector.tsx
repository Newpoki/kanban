import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from '@/icons'
import { cn } from '@/lib/utils'
import { useTheme } from './use-theme'
import { useCallback } from 'react'

type ThemeSelectorProps = {
    className?: string
}

export const ThemeSelector = ({ className }: ThemeSelectorProps) => {
    const { setTheme, theme } = useTheme()

    const handleToggleTheme = useCallback(
        (checked: boolean) => {
            setTheme(checked ? 'dark' : 'light')
        },
        [setTheme]
    )

    return (
        <div
            className={cn(
                'flex items-center justify-center gap-6 rounded-md bg-grey-100 py-[14px]',
                className
            )}
        >
            <Sun className="h-[18px] w-[18px]" />
            <Switch checked={theme === 'dark'} onCheckedChange={handleToggleTheme} />

            <Moon className="h-4 w-4" />
        </div>
    )
}

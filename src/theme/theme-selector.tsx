import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from '@/icons'
import { cn } from '@/lib/utils'

type ThemeSelectorProps = {
    className?: string
}

export const ThemeSelector = ({ className }: ThemeSelectorProps) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center gap-6 rounded-md bg-grey-100 py-[14px]',
                className
            )}
        >
            <Sun className="h-[18px] w-[18px]" />
            <Switch />

            <Moon className="h-4 w-4" />
        </div>
    )
}

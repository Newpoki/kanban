import { useTheme } from '@/theme/use-theme'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme } = useTheme()

    return (
        <Sonner
            theme={theme}
            className="toaster group"
            toastOptions={{
                classNames: {
                    info: 'group-[.toaster]:text-purple-500 group-[.toaster]:border-purple-300 group-[.toaster]:bg-white dark:group-[.toaster]:border-purple-300/25 dark:group-[.toaster]:bg-grey-900 dark:group-[.toaster]:text-purple-300',
                },
            }}
            {...props}
        />
    )
}

export { Toaster }

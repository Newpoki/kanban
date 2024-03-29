import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const buttonVariants = cva(
    'capitalize inline-flex items-center justify-center whitespace-nowrap text-[13px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 ring-purple-300 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-purple-500 text-white hover:bg-purple-300',
                error: 'bg-red-500 text-white hover:bg-red-300',
                secondary:
                    'bg-purple-500/10 text-purple-500 hover:bg-purple-500/25 dark:bg-white dark:hover:bg-white/90',
                transparent: 'bg-transparent ',
            },
            size: {
                default: 'py-[14.25px] px-8 rounded-3xl text-h-m',
                small: 'p-[10.25px] rounded-[20px] px-6',
                icon: 'p-2 rounded-md',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button }

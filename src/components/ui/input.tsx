import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        const hasError = error != null && error.length > 0

        return (
            <label
                className={cn(
                    'flex h-10 w-full items-center gap-2 rounded-md border border-grey-500/25 px-4 text-l text-black ring-purple-300 transition-colors has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-purple-300 dark:text-white',
                    {
                        'border-red-500 has-[:focus-visible]:ring-red-500':
                            error != null && error.length > 0,
                    }
                )}
            >
                <input
                    {...props}
                    className={cn('w-full bg-transparent outline-none', className)}
                    ref={ref}
                />
                {error && (
                    <span
                        className={cn('whitespace-nowrap', {
                            'text-red-500': hasError,
                        })}
                    >
                        {error}
                    </span>
                )}
            </label>
        )
    }
)
Input.displayName = 'Input'

export { Input }

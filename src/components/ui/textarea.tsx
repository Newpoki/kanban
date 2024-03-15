import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        const hasError = error != null && error.length > 0

        return (
            <label
                className={cn(
                    'flex w-full items-start gap-2 rounded-md border border-grey-500/25 px-4 py-2 text-l text-black ring-purple-300 transition-colors has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-purple-300 dark:text-white',
                    {
                        'border-red-500 has-[:focus-visible]:ring-red-500':
                            error != null && error.length > 0,
                    }
                )}
            >
                <textarea
                    className={cn(
                        'min-h-[112px] w-full resize-none bg-transparent outline-none',
                        className
                    )}
                    {...props}
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
Textarea.displayName = 'Textarea'

export { Textarea }

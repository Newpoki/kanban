import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'dark:placeholder:text-slate-400  dark:focus-visible:ring-slate-300 flex min-h-[112px] w-full rounded-md border border-grey-500/25 bg-transparent px-3 py-2 text-l shadow-sm placeholder:text-black/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-300 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:placeholder:text-white/25',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }

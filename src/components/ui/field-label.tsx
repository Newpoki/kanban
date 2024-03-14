import { cn } from '@/lib/utils'

type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export const FieldLabel = ({ className, ...others }: FieldLabelProps) => {
    return (
        <label
            {...others}
            className={cn('text-m capitalize text-grey-500 dark:text-white', className)}
        />
    )
}

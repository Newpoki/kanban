import { ControlledInput, ControlledInputProps } from '@/components/form/controlled-input'
import { Close } from '@/icons'
import { TaskDialogFormValues } from './task-schemas'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type TaskDialogFormContentSubtaskFieldProps = Omit<
    ControlledInputProps<TaskDialogFormValues>,
    'name'
> & {
    index: number
    onDelete: (index: number) => void
}

export const TaskDialogFormContentSubtaskField = ({
    className,
    onDelete,
    index,
    ...others
}: TaskDialogFormContentSubtaskFieldProps) => {
    const { register } = useForm<TaskDialogFormValues>()

    const handleDelete = useCallback(() => {
        onDelete(index)
    }, [index, onDelete])

    return (
        <div className="flex w-full items-center gap-2">
            <ControlledInput
                {...others}
                className={cn('w-full', className)}
                name={`subtasks.${index}.name`}
            />
            <Button size="icon" variant="transparent" type="button" onClick={handleDelete}>
                <Close className="h-4 w-4" />
            </Button>

            <input hidden {...register(`subtasks.${index}.id`)} />
        </div>
    )
}

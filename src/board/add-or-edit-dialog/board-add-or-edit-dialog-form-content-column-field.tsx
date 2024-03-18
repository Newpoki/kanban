import { ControlledInput, ControlledInputProps } from '@/components/form/controlled-input'
import { Close } from '@/icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { BoardAddOrEditDialogFormValues } from '../board-schemas'
import { getFieldKey } from '@/lib/get-field-key'

type BoardAddOrEditDialogFormContentColumnFieldProps = Omit<
    ControlledInputProps<BoardAddOrEditDialogFormValues>,
    'name'
> & {
    index: number
    onDelete: (index: number) => void
}

export const BoardAddOrEditDialogFormContentColumnField = ({
    onDelete,
    index,
    ...others
}: BoardAddOrEditDialogFormContentColumnFieldProps) => {
    const { register } = useFormContext<BoardAddOrEditDialogFormValues>()

    const handleDelete = useCallback(() => {
        onDelete(index)
    }, [index, onDelete])

    return (
        <div className="flex w-full items-center gap-2">
            <input
                type="color"
                {...register(`columns.${index}.color`)}
                className="h-8 w-12 flex-shrink-0 bg-transparent"
            />

            <ControlledInput
                {...others}
                name={getFieldKey<BoardAddOrEditDialogFormValues>(`columns.${index}.name`)}
            />
            <Button size="icon" variant="transparent" type="button" onClick={handleDelete}>
                <Close className="h-4 w-4" />
            </Button>

            <input hidden {...register(`columns.${index}.id`)} />
        </div>
    )
}

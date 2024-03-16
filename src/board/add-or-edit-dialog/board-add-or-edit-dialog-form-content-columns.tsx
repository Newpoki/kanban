import { FormLabel } from '@/components/ui/form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid'
import { BoardAddOrEditDialogFormValues } from '../board-schemas'
import { BoardAddOrEditDialogFormContentColumnField } from './board-add-or-edit-dialog-form-content-column-field'

export const BoardAddOrEditDialogFormContentColumns = () => {
    const { control } = useFormContext<BoardAddOrEditDialogFormValues>()
    const { fields, remove, append } = useFieldArray({ control, name: 'columns', keyName: 'key' })

    const handleAddColumn = useCallback(() => {
        append({ name: '', id: uuidv4(), color: '#123456' }, { shouldFocus: true })
    }, [append])

    return (
        <div className="flex flex-col gap-2">
            <FormLabel>Board columns</FormLabel>

            <div className="flex flex-col gap-3">
                {fields.map((field, index) => {
                    return (
                        <BoardAddOrEditDialogFormContentColumnField
                            key={field.key}
                            placeholder="e.g. Make coffee"
                            index={index}
                            onDelete={remove}
                        />
                    )
                })}
            </div>

            <Button variant="secondary" size="small" type="button" onClick={handleAddColumn}>
                + Add new column
            </Button>
        </div>
    )
}

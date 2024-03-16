import { FormLabel } from '@/components/ui/form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid'
import { TaskAddOrEditDialogFormValues } from '../task-schemas'
import { TaskAddOrEditDialogFormContentSubtaskField } from './task-add-or-edit-dialog-form-content-subtask-field'

export const TaskAddOrEditDialogFormContentSubtasks = () => {
    const { control } = useFormContext<TaskAddOrEditDialogFormValues>()
    const { fields, remove, append } = useFieldArray({ control, name: 'subtasks', keyName: 'key' })

    const handleAddSubtask = useCallback(() => {
        append({ name: '', id: uuidv4() }, { shouldFocus: true })
    }, [append])

    return (
        <div className="flex flex-col gap-2">
            <FormLabel>Subtasks</FormLabel>

            <div className="flex flex-col gap-3">
                {fields.map((field, index) => {
                    return (
                        <TaskAddOrEditDialogFormContentSubtaskField
                            key={field.key}
                            placeholder="e.g. Make coffee"
                            index={index}
                            onDelete={remove}
                        />
                    )
                })}
            </div>

            <Button variant="secondary" size="small" type="button" onClick={handleAddSubtask}>
                + Add New Subtask
            </Button>
        </div>
    )
}

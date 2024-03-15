import { FormLabel } from '@/components/ui/form'
import { TaskDialogFormValues } from './task-schemas'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid'
import { TaskDialogFormContentSubtaskField } from './task-dialog-form-content-subtask-field'

export const TaskDialogFormContentSubtasks = () => {
    const { control } = useFormContext<TaskDialogFormValues>()
    const { fields, remove, append } = useFieldArray({ control, name: 'subtasks', keyName: 'key' })

    const handleDeleteSubtask = useCallback(
        (subtaskIndex: number) => {
            remove(subtaskIndex)
        },
        [remove]
    )

    const handleAddSubtask = useCallback(() => {
        append({ name: '', id: uuidv4() }, { shouldFocus: true })
    }, [append])

    return (
        <div className="flex flex-col gap-2">
            <FormLabel htmlFor="subtasks">Subtasks</FormLabel>

            <div className="flex flex-col gap-3">
                {fields.map((field, index) => {
                    return (
                        <TaskDialogFormContentSubtaskField
                            key={field.key}
                            placeholder="e.g. Make coffee"
                            index={index}
                            onDelete={handleDeleteSubtask}
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

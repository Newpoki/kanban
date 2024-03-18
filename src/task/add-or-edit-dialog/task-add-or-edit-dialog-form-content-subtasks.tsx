import { FormLabel } from '@/components/ui/form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid'
import {
    TaskAddOrEditDialogFormContentSubtaskDraggableData,
    TaskAddOrEditDialogFormValues,
} from '../task-schemas'
import { DndContext, DragOverEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { TaskAddOrEditDialogFormContentSubtaskDraggable } from './task-add-or-edit-dialog-form-content-subtask-draggable'

export const TaskAddOrEditDialogFormContentSubtasks = () => {
    const { control } = useFormContext<TaskAddOrEditDialogFormValues>()
    const { fields, remove, append, swap } = useFieldArray({
        control,
        name: 'subtasks',
        keyName: 'key',
    })

    const handleAddSubtask = useCallback(() => {
        append({ name: '', id: uuidv4() }, { shouldFocus: true })
    }, [append])

    const handleDragOver = useCallback(
        ({ active, over }: DragOverEvent) => {
            if (over == null) {
                return
            }

            if (active.data.current == null || over.data.current == null) {
                return
            }

            const activeData = active.data
                .current as TaskAddOrEditDialogFormContentSubtaskDraggableData

            const overData = over.data.current as TaskAddOrEditDialogFormContentSubtaskDraggableData

            swap(activeData.subtaskIndex, overData.subtaskIndex)
        },
        [swap]
    )

    // We can't use a `DragOverlay` because the rendered element would contain react hook form registration
    // This would required the creation of a whole new component only for the drag overlay, and this is not enough
    // for the added complexity
    return (
        <DndContext onDragOver={handleDragOver}>
            <SortableContext items={fields}>
                <div className="flex flex-col gap-2">
                    <FormLabel>Subtasks</FormLabel>

                    <ul className="flex flex-col gap-3">
                        {fields.map((field, index) => {
                            return (
                                <TaskAddOrEditDialogFormContentSubtaskDraggable
                                    key={field.key}
                                    placeholder="e.g. Make coffee"
                                    index={index}
                                    onDelete={remove}
                                />
                            )
                        })}
                    </ul>

                    <Button
                        variant="secondary"
                        size="small"
                        type="button"
                        onClick={handleAddSubtask}
                    >
                        + Add New Subtask
                    </Button>
                </div>
            </SortableContext>
        </DndContext>
    )
}

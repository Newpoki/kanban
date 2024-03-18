import { FormLabel } from '@/components/ui/form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid'
import {
    BoardAddOrEditDialogFormContentColumnDraggableData,
    BoardAddOrEditDialogFormValues,
} from '../board-schemas'
import { DndContext, DragOverEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { BoardAddOrEditDialogFormContentColumnDraggable } from './board-add-or-edit-dialog-form-content-column-draggable'

export const BoardAddOrEditDialogFormContentColumns = () => {
    const { control } = useFormContext<BoardAddOrEditDialogFormValues>()
    const { fields, remove, append, swap } = useFieldArray({
        control,
        name: 'columns',
        keyName: 'key',
    })

    const handleAddColumn = useCallback(() => {
        append({ name: '', id: uuidv4(), color: '#123456' }, { shouldFocus: true })
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
                .current as BoardAddOrEditDialogFormContentColumnDraggableData

            const overData = over.data.current as BoardAddOrEditDialogFormContentColumnDraggableData

            swap(activeData.columnIndex, overData.columnIndex)
        },
        [swap]
    )

    return (
        <DndContext onDragOver={handleDragOver}>
            <SortableContext items={fields}>
                <div className="flex flex-col gap-2">
                    <FormLabel>Board columns</FormLabel>

                    <div className="flex flex-col gap-3">
                        {fields.map((field, index) => {
                            return (
                                <BoardAddOrEditDialogFormContentColumnDraggable
                                    key={field.key}
                                    index={index}
                                    onDelete={remove}
                                />
                            )
                        })}
                    </div>

                    <Button
                        variant="secondary"
                        size="small"
                        type="button"
                        onClick={handleAddColumn}
                    >
                        + Add new column
                    </Button>
                </div>
            </SortableContext>
        </DndContext>
    )
}

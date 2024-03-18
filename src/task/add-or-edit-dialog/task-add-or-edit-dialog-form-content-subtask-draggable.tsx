import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TaskAddOrEditDialogFormContentSubtaskField } from './task-add-or-edit-dialog-form-content-subtask-field'
import { ControlledInputProps } from '@/components/form/controlled-input'
import { TaskAddOrEditDialogFormValues } from '../task-schemas'
import { useFormContext, useWatch } from 'react-hook-form'
import { DragHandle } from '@/icons'
import { useMemo } from 'react'

type TaskAddOrEditDialogFormContentSubtaskDraggableProps = Omit<
    ControlledInputProps<TaskAddOrEditDialogFormValues>,
    'name'
> & {
    index: number
    onDelete: (index: number) => void
}

export const TaskAddOrEditDialogFormContentSubtaskDraggable = ({
    index,
    ...others
}: TaskAddOrEditDialogFormContentSubtaskDraggableProps) => {
    const { control } = useFormContext<TaskAddOrEditDialogFormValues>()

    const subtask = useWatch({ control, name: `subtasks.${index}` })

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: subtask.id,
        data: {
            subtaskIndex: index,
        },
    })

    const style = useMemo<React.CSSProperties>(
        () => ({
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
        }),
        [isDragging, transform, transition]
    )

    return (
        <li ref={setNodeRef} style={style} className="flex items-center ">
            <button
                {...attributes}
                {...listeners}
                type="button"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                <DragHandle className="h-6 w-6 text-grey-500" />
            </button>

            <TaskAddOrEditDialogFormContentSubtaskField
                {...others}
                index={index}
                placeholder="e.g. Make coffee"
            />
        </li>
    )
}

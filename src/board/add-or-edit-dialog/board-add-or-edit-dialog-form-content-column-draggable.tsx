import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BoardAddOrEditDialogFormContentColumnField } from './board-add-or-edit-dialog-form-content-column-field'
import { ControlledInputProps } from '@/components/form/controlled-input'
import { BoardAddOrEditDialogFormValues } from '../board-schemas'
import { useFormContext, useWatch } from 'react-hook-form'
import { DragHandle } from '@/icons'
import { useMemo } from 'react'

type BoardAddOrEditDialogFormContentColumnDraggableProps = Omit<
    ControlledInputProps<BoardAddOrEditDialogFormValues>,
    'name'
> & {
    index: number
    onDelete: (index: number) => void
}

export const BoardAddOrEditDialogFormContentColumnDraggable = ({
    index,
    ...others
}: BoardAddOrEditDialogFormContentColumnDraggableProps) => {
    const { control } = useFormContext<BoardAddOrEditDialogFormValues>()

    const column = useWatch({ control, name: `columns.${index}` })

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            columnIndex: index,
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

            <BoardAddOrEditDialogFormContentColumnField {...others} index={index} />
        </li>
    )
}

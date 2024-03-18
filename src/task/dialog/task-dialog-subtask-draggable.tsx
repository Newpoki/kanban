import {
    Board,
    BoardColumn,
    BoardColumnTask,
    BoardColumnTaskSubtask,
} from '@/boards/boards-schemas'
import { TaskDialogSubtask } from './task-dialog-subtask'
import { useSortable } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { DragHandle } from '@/icons'

type TaskDialogSubtaskDraggableProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    index: number
    taskId: BoardColumnTask['id']
    subtask: BoardColumnTaskSubtask
}

export const TaskDialogSubtaskDraggable = ({
    boardId,
    columnId,
    index,
    taskId,
    subtask,
}: TaskDialogSubtaskDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: subtask.id,
        data: {
            subtaskId: subtask.id,
            subtaskName: subtask.name,
            subtaskStatus: subtask.status,
            subtaskIndex: index,
        },
    })

    const style = useMemo<React.CSSProperties>(
        () => ({
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
            cursor: 'grab',
        }),
        [isDragging, transform, transition]
    )

    return (
        <li style={style} className="flex w-full items-center" ref={setNodeRef}>
            <TaskDialogSubtask
                grabHandle={
                    <button
                        {...attributes}
                        {...listeners}
                        type="button"
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                        <DragHandle className="h-6 w-6 text-grey-500" />
                    </button>
                }
                boardId={boardId}
                columnId={columnId}
                subtask={subtask}
                taskId={taskId}
            />
        </li>
    )
}

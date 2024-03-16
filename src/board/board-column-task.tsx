import { Board, BoardColumn, BoardColumnTask as IBoardColumnTask } from '@/boards/boards-schemas'
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { BoardColumnTaskDraggableData } from './board-schemas'

type BoardColumnTaskProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    task: IBoardColumnTask
}

export const BoardColumnTask = ({ boardId, columnId, task }: BoardColumnTaskProps) => {
    const draggableData: BoardColumnTaskDraggableData = { taskId: task.id, columnId }

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
        data: draggableData,
    })

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        // Otherwise click will trigger when dropping
        pointerEvents: isDragging ? 'none' : 'initial',
        // https://docs.dndkit.com/api-documentation/sensors/touch#recommendations
        touchAction: 'none',
    } as const

    const doneCount = useMemo(() => {
        return task.subtasks.filter((subtask) => subtask.status === 'done').length
    }, [task.subtasks])

    return (
        <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
            <Link
                to="/boards/$boardId/column/$columnId/task/$taskId"
                params={{ boardId, columnId: columnId, taskId: task.id }}
            >
                <li
                    className={cn(
                        'group w-[280px] rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-grey-800',
                        {
                            'ring-1 ring-purple-500': isDragging,
                        }
                    )}
                >
                    <h3 className="mb-2 text-h-m group-hover:text-purple-500 dark:text-white">
                        {task.name}
                    </h3>

                    <span className="dark:text-grey500 text-m text-grey-500">
                        {doneCount} of {task.subtasks.length} subtasks
                    </span>
                </li>
            </Link>
        </div>
    )
}

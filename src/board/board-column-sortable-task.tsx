import { Board, BoardColumn, BoardColumnTask as IBoardColumnTask } from '@/boards/boards-schemas'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMemo } from 'react'
import { BoardColumnTask } from './board-column-task'
import { Link } from '@tanstack/react-router'

type BoardColumnSortableTaskProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    taskId: IBoardColumnTask['id']
}

export const BoardColumnSortableTask = ({
    boardId,
    columnId,
    taskId,
}: BoardColumnSortableTaskProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: taskId,
        data: {
            taskId,
        },
    })

    const style = useMemo(
        () => ({
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
        }),
        [isDragging, transform, transition]
    )

    return (
        <Link
            {...attributes}
            {...listeners}
            style={style}
            ref={setNodeRef}
            to="/boards/$boardId/column/$columnId/task/$taskId"
            params={{ boardId, columnId, taskId }}
        >
            <BoardColumnTask boardId={boardId} key={taskId} taskId={taskId} />
        </Link>
    )
}

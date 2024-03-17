import { Board, BoardColumnTask as IBoardColumnTask } from '@/boards/boards-schemas'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMemo } from 'react'
import { BoardColumnTask } from './board-column-task'

type BoardColumnSortableTaskProps = {
    boardId: Board['id']
    taskId: IBoardColumnTask['id']
}

export const BoardColumnSortableTask = ({ boardId, taskId }: BoardColumnSortableTaskProps) => {
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
        <li {...attributes} {...listeners} style={style} ref={setNodeRef}>
            <BoardColumnTask boardId={boardId} key={taskId} taskId={taskId} />
        </li>
    )
}

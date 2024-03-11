import { Board, BoardColumn, BoardColumnTask as IBoardColumnTask } from '@/boards/boards-schemas'
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'

type BoardColumnTaskProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    task: IBoardColumnTask
}

export const BoardColumnTask = ({ boardId, columnId, task }: BoardColumnTaskProps) => {
    const doneCount = useMemo(() => {
        return task.subtasks.filter((subtask) => subtask.status === 'done').length
    }, [task.subtasks])

    return (
        <Link
            to="/boards/$boardId/column/$columnId/task/$taskId"
            params={{ boardId, columnId: columnId, taskId: task.id }}
        >
            <li className="group w-[280px] rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-grey-800">
                <h3 className="mb-2 text-h-m group-hover:text-purple-500 dark:text-white">
                    {task.name}
                </h3>

                <span className="dark:text-grey500 text-m text-grey-500">
                    {doneCount} of {task.subtasks.length} subtasks
                </span>
            </li>
        </Link>
    )
}

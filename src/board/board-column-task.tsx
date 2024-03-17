import { Board, BoardColumnTask as IBoardColumnTask } from '@/boards/boards-schemas'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useBoardsStore } from '@/boards/boards-store'
import { selectBoardTask } from '@/boards/boards-selectors'

type BoardColumnTaskProps = {
    boardId: Board['id']
    taskId: IBoardColumnTask['id']
}

export const BoardColumnTask = ({ boardId, taskId }: BoardColumnTaskProps) => {
    const task = useBoardsStore(selectBoardTask({ boardId, taskId }))

    const doneCount = useMemo(() => {
        return task?.subtasks.filter((subtask) => subtask.status === 'done').length
    }, [task?.subtasks])

    if (task == null) {
        return null
    }

    return (
        <div
            className={cn(
                'group w-[280px] rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-grey-800'
            )}
        >
            <h3 className="mb-2 text-h-m group-hover:text-purple-500 dark:text-white">
                {task.name}
            </h3>

            <span className="dark:text-grey500 text-m text-grey-500">
                {doneCount} of {task.subtasks.length} subtasks
            </span>
        </div>
    )
}

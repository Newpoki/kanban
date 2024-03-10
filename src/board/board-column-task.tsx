import { BoardColumnTask as IBoardColumnTask } from '@/boards/boards-schemas'
import { useMemo } from 'react'

type BoardColumnTaskProps = {
    task: IBoardColumnTask
}

export const BoardColumnTask = ({ task }: BoardColumnTaskProps) => {
    const doneCount = useMemo(() => {
        return task.subtasks.filter((subtask) => subtask.status === 'done').length
    }, [task.subtasks])

    return (
        <li className="w-[280px] rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-grey-800">
            <h3 className="mb-2 text-h-m dark:text-white">{task.name}</h3>

            <span className="dark:text-grey500 text-m text-grey-500">
                {doneCount} of {task.subtasks.length} subtasks
            </span>
        </li>
    )
}

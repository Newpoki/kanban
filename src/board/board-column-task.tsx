import { useMemo } from 'react'
import { FAKE_DATA } from '../fake-data'

type BoardColumnTaskProps = {
    task: (typeof FAKE_DATA)[number]['columns'][number]['tasks'][number]
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

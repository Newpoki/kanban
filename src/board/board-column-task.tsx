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
        <li className="w-[280px] rounded-lg bg-white px-4 py-6 shadow-lg">
            <h3 className="mb-2 text-h-m">{task.name}</h3>

            <span className="text-m text-grey-500">
                {doneCount} of {task.subtasks.length} subtasks
            </span>
        </li>
    )
}

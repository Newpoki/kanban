import { FAKE_DATA } from '../fake-data'
import { BoardColumnTask } from './board-column-task'

type BoardColumnProps = {
    column: (typeof FAKE_DATA)[number]['columns'][number]
}

export const BoardColumn = ({ column }: BoardColumnProps) => {
    return (
        // As board layout is a bit complicated relaying on flex implementation and auto height
        // we have to define "board bottom padding" here as bottom margin
        <section className="mb-6 h-fit">
            <h2 className="mb-6 flex items-center gap-3">
                <span className="h-4 w-4 rounded-full" style={{ backgroundColor: column.color }} />
                <span className="text-h-s uppercase text-grey-500">
                    {column.name} ({column.tasks.length})
                </span>
            </h2>

            <ul className="flex w-full flex-col gap-5">
                {column.tasks.map((task) => {
                    return <BoardColumnTask key={task.id} task={task} />
                })}
            </ul>
        </section>
    )
}

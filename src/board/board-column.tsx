import { FAKE_DATA } from '../fake-data'

type BoardColumnProps = {
    column: (typeof FAKE_DATA)['columns'][number]
}

export const BoardColumn = ({ column }: BoardColumnProps) => {
    return (
        <section>
            <h2>{column.name}</h2>
            <div>
                {column.tasks.map((task) => {
                    return <div key={task.id}>{task.name}</div>
                })}
            </div>
        </section>
    )
}

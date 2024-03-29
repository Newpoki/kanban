import { Board, BoardColumn as IBoardColumn } from '@/boards/boards-schemas'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { BoardColumnSortableTask } from './board-column-sortable-task'

type BoardColumnProps = {
    boardId: Board['id']
    column: IBoardColumn
}

export const BoardColumn = ({ boardId, column }: BoardColumnProps) => {
    const { setNodeRef } = useDroppable({ id: column.id })

    return (
        <SortableContext id={column.id} items={column.tasks} strategy={rectSortingStrategy}>
            <section className="flex flex-col" ref={setNodeRef}>
                <h2 className="mb-6 flex items-center gap-3 text-h-s uppercase text-grey-500">
                    <span
                        className="h-4 w-4 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: column.color }}
                    />

                    <div className="flex items-center gap-1 overflow-hidden">
                        <span className="truncate">{column.name}</span>

                        <span> ({column.tasks.length})</span>
                    </div>
                </h2>

                <ul className="flex w-full flex-1 flex-col gap-5">
                    {column.tasks.map((task) => {
                        return (
                            <BoardColumnSortableTask
                                boardId={boardId}
                                columnId={column.id}
                                taskId={task.id}
                                key={task.id}
                            />
                        )
                    })}
                </ul>
            </section>
        </SortableContext>
    )
}

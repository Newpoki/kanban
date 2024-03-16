import { Board, BoardColumn as IBoardColumn } from '@/boards/boards-schemas'
import { BoardColumnTask } from './board-column-task'
import { useDndContext } from '@dnd-kit/core'
import { BoardColumnDroppable } from './board-column-droppable'
import { useMemo } from 'react'
import { BoardColumnTaskDraggableData } from './board-schemas'

type BoardColumnProps = {
    boardId: Board['id']
    column: IBoardColumn
}

export const BoardColumn = ({ boardId, column }: BoardColumnProps) => {
    const { active } = useDndContext()

    const draggableData = active?.data.current as BoardColumnTaskDraggableData | undefined

    const isDraggingTaskFromAnotherColumn = useMemo(() => {
        return active != null && draggableData?.columnId !== column.id
    }, [active, column.id, draggableData?.columnId])

    return (
        <section className="flex flex-col">
            <h2 className="mb-6 flex items-center gap-3">
                <span className="h-4 w-4 rounded-full" style={{ backgroundColor: column.color }} />
                <span className="text-h-s uppercase text-grey-500">
                    {column.name} ({column.tasks.length})
                </span>
            </h2>

            {isDraggingTaskFromAnotherColumn ? (
                <BoardColumnDroppable column={column} />
            ) : (
                <ul className="flex w-full flex-col gap-5">
                    {column.tasks.map((task) => {
                        return (
                            <BoardColumnTask
                                boardId={boardId}
                                columnId={column.id}
                                key={task.id}
                                task={task}
                            />
                        )
                    })}
                </ul>
            )}
        </section>
    )
}

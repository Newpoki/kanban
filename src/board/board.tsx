import { BoardColumn } from './board-column'
import { BoardColumnPlaceholder } from './board-column-placeholder'
import { BoardHeader } from './header/board-header'
import { Board as IBoard } from '@/boards/boards-schemas'
import { Outlet } from '@tanstack/react-router'
import {
    DndContext,
    DragEndEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { useCallback } from 'react'
import { useBoardsStore } from '@/boards/boards-store'
import { boardColumnDroppableDataSchema, boardColumnTaskDraggableDataSchema } from './board-schemas'
import { BoardEmpty } from './board-empty'

type BoardProps = {
    board: IBoard
}

export const Board = ({ board }: BoardProps) => {
    const changeTaskColumn = useBoardsStore((store) => store.changeTaskColumn)

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 8,
        },
    })

    const sensors = useSensors(mouseSensor, touchSensor)

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            console.log('drag', event)

            const parsedTaskDraggableData = boardColumnTaskDraggableDataSchema.safeParse(
                event.active.data.current
            )

            const parsedColumnDroppableData = boardColumnDroppableDataSchema.safeParse(
                event.over?.data.current
            )

            if (!parsedTaskDraggableData.success || !parsedColumnDroppableData.success) {
                return
            }

            // It means user wanted to cancel the drag and drop, so we're not doing any modifications
            if (parsedTaskDraggableData.data.columnId === parsedColumnDroppableData.data.columnId) {
                return
            }

            changeTaskColumn({
                boardId: board.id,
                currentColumnId: parsedTaskDraggableData.data.columnId,
                nextColumnId: parsedColumnDroppableData.data.columnId,
                taskId: parsedTaskDraggableData.data.taskId,
            })
        },
        [board.id, changeTaskColumn]
    )

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <div className="flex w-full flex-1 flex-col overflow-hidden">
                <BoardHeader board={board} />

                {board.columns.length === 0 ? (
                    <BoardEmpty boardId={board.id} />
                ) : (
                    // Flex 1 1 0 instead of flex 1 to fix issue with scrolling cf https://stackoverflow.com/questions/70198644/overflow-scroll-on-div-with-flex-1-without-specific-height
                    <main
                        className="grid flex-[1_1_0] gap-6 overflow-auto px-4 py-6 "
                        style={{
                            gridTemplateColumns: `repeat(${board.columns.length + 1}, 280px)`,
                        }}
                    >
                        {board.columns.map((column) => {
                            return (
                                <BoardColumn key={column.id} boardId={board.id} column={column} />
                            )
                        })}

                        <BoardColumnPlaceholder />
                    </main>
                )}

                <Outlet />
            </div>
        </DndContext>
    )
}

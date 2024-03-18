import { BoardColumn } from './board-column'
import { BoardColumnPlaceholder } from './board-column-placeholder'
import { Board as IBoard } from '@/boards/boards-schemas'
import { Outlet } from '@tanstack/react-router'
import { DndContext, pointerWithin } from '@dnd-kit/core'
import { BoardEmpty } from './board-empty'
import { BoardColumnTaskDragOverlay } from './board-column-task-drag-overlay'
import { useBoardDnd } from './use-board-dnd'

type BoardProps = {
    board: IBoard
}

export const Board = ({ board }: BoardProps) => {
    const { onDragEnd, onDragOver, sensors } = useBoardDnd({ board })

    return (
        <DndContext
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            sensors={sensors}
            // Using pointerWithin seems to fix a weird issue where SortingDnd tools
            // create infinite renders
            collisionDetection={pointerWithin}
        >
            <div className="board-border-color flex w-full flex-1 flex-col overflow-hidden border-t-[1px]">
                {board.columns.length === 0 ? (
                    <BoardEmpty boardId={board.id} />
                ) : (
                    // Flex 1 1 0 instead of flex 1 to fix issue with scrolling cf https://stackoverflow.com/questions/70198644/overflow-scroll-on-div-with-flex-1-without-specific-height
                    <main
                        className=" grid flex-[1_1_0] gap-6 overflow-auto p-6"
                        style={{
                            gridTemplateColumns: `repeat(${board.columns.length + 1}, 280px)`,
                        }}
                    >
                        {board.columns.map((column) => {
                            return (
                                <BoardColumn key={column.id} boardId={board.id} column={column} />
                            )
                        })}

                        <BoardColumnPlaceholder boardId={board.id} />
                    </main>
                )}

                <Outlet />
            </div>

            <BoardColumnTaskDragOverlay boardId={board.id} />
        </DndContext>
    )
}

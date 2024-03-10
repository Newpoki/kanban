import { BoardColumn } from './board-column'
import { BoardColumnPlaceholder } from './board-column-placeholder'
import { BoardHeader } from './header/board-header'
import { Board as IBoard } from '@/boards/boards-schemas'

type BoardProps = {
    board: IBoard
}

export const Board = ({ board }: BoardProps) => {
    return (
        <div className="flex w-full flex-1 flex-col overflow-hidden">
            <BoardHeader board={board} />

            {/* Flex 1 1 0 instead of flex 1 to fix issue with scrolling cf https://stackoverflow.com/questions/70198644/overflow-scroll-on-div-with-flex-1-without-specific-height */}
            <main
                className="grid flex-[1_1_0] gap-6 overflow-auto bg-grey-100 px-4 py-6 dark:bg-grey-900"
                style={{ gridTemplateColumns: `repeat(${board.columns.length + 1}, 280px)` }}
            >
                {board.columns.map((column) => {
                    return <BoardColumn key={column.id} column={column} />
                })}

                <BoardColumnPlaceholder />
            </main>
        </div>
    )
}

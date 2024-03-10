import { FAKE_DATA } from '../fake-data'
import { BoardColumn } from './board-column'
import { BoardHeader } from './header/board-header'

export const Board = () => {
    return (
        <div className="flex w-full flex-1 flex-col overflow-hidden">
            <BoardHeader board={FAKE_DATA[0]} />

            {/* Flex 1 1 0 instead of flex 1 to fix issue with scrolling cf https://stackoverflow.com/questions/70198644/overflow-scroll-on-div-with-flex-1-without-specific-height */}
            <main className="flex flex-[1_1_0] gap-6 overflow-auto bg-grey-100 px-4 pt-6 dark:bg-grey-900">
                {FAKE_DATA[0].columns.map((column) => {
                    return <BoardColumn key={column.id} column={column} />
                })}
            </main>
        </div>
    )
}

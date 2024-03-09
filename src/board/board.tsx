import { FAKE_DATA } from '../fake-data'
import { BoardColumn } from './board-column'
import { BoardHeader } from './header/board-header'

export const Board = () => {
    return (
        <div className="flex flex-1 flex-col">
            <BoardHeader board={FAKE_DATA[0]} />

            <main className="dark:bg-grey-900 flex flex-1 gap-6 overflow-x-auto bg-grey-100 px-4 py-6">
                {FAKE_DATA[0].columns.map((column) => {
                    return <BoardColumn key={column.id} column={column} />
                })}
            </main>
        </div>
    )
}

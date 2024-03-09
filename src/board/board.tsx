import { FAKE_DATA } from '../fake-data'
import { BoardColumn } from './board-column'

export const Board = () => {
    return (
        <main className="flex flex-1 gap-6 overflow-x-auto bg-grey-100 px-4 py-6">
            {FAKE_DATA.columns.map((column) => {
                return <BoardColumn key={column.id} column={column} />
            })}
        </main>
    )
}

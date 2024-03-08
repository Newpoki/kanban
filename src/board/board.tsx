import { FAKE_DATA } from '../fake-data'
import { BoardColumn } from './board-column'

export const Board = () => {
    return (
        <main>
            {FAKE_DATA.columns.map((column) => {
                return <BoardColumn key={column.id} column={column} />
            })}
        </main>
    )
}

import { useParams } from '@tanstack/react-router'
import { BoardsEmpty } from './boards-empty'
import { selectBoardsList } from './boards-selectors'
import { useBoardsStore } from './boards-store'
import { BoardsNotSelected } from './boards-not-selected'

export const Boards = () => {
    const boards = useBoardsStore(selectBoardsList)
    const { boardId } = useParams({ from: '/boards/$boardId' })

    if (boards.length === 0 && boardId == null) {
        return <BoardsEmpty />
    }

    if (boardId == null) {
        return <BoardsNotSelected />
    }

    return null
}

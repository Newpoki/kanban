import { BoardsListItem } from './boards-list-item'
import { Board } from './boards-schemas'
import { useBoardsStore } from './boards-store'
import { Link } from '@tanstack/react-router'

type BoardsListProps = {
    boardId: Board['id']
}

export const BoardsList = ({ boardId }: BoardsListProps) => {
    const boards = useBoardsStore((store) => Object.values(store.data))

    return (
        <>
            <h2 className="pb-5 pl-6 pt-4 text-h-s uppercase text-grey-500">
                All boards ({boards.length})
            </h2>

            <ul className="pr-6">
                {boards.map((board, index) => {
                    // TODO: check url to know if displayed board
                    const isSelected = index === 0

                    return (
                        <Link to="/boards/$boardId" key={board.id} params={{ boardId: board.id }}>
                            <BoardsListItem
                                board={board}
                                variant={isSelected ? 'selected' : undefined}
                            />
                        </Link>
                    )
                })}
            </ul>

            <Link to="/boards/$boardId/add" params={{ boardId: boardId }}>
                <BoardsListItem variant="new" />
            </Link>
        </>
    )
}

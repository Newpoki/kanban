import { useCallback } from 'react'
import { BoardsListItem } from './boards-list-item'
import { Board } from './boards-schemas'
import { selectBoardById, selectBoardsList } from './boards-selectors'
import { useBoardsStore } from './boards-store'
import { Link, useNavigate } from '@tanstack/react-router'

type BoardsListProps = {
    boardId?: Board['id']
}

export const BoardsList = ({ boardId }: BoardsListProps) => {
    const boards = useBoardsStore(selectBoardsList)
    const board = useBoardsStore(selectBoardById({ boardId }))

    const navigate = useNavigate()

    const handleAddNewBoard = useCallback(() => {
        // navigate({ to: board != null ? '/boards/$boardId/add' : '/boards/add' })
        board == null
            ? navigate({ to: '/boards/add' })
            : navigate({ to: '/boards/$boardId/add', params: { boardId: board.id } })
    }, [board, navigate])

    return (
        <>
            <h2 className="pb-5 pl-6 pt-4 text-h-s uppercase text-grey-500">
                All boards ({boards.length})
            </h2>

            <ul className="pr-6">
                {boards.map((board) => {
                    const isSelected = board.id === boardId

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

            <div onClick={handleAddNewBoard}>
                <BoardsListItem variant="new" />
            </div>
            {/* </Link> */}
        </>
    )
}

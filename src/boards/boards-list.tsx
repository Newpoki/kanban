import { useCallback } from 'react'
import { BoardsListItem } from './boards-list-item'
import { Board } from './boards-schemas'
import { selectBoardById, selectBoardsList } from './boards-selectors'
import { useBoardsStore } from './boards-store'
import { useNavigate } from '@tanstack/react-router'
import { ScrollArea } from '@/components/ui/scroll-area'

type BoardsListProps = {
    boardId?: Board['id']
}

export const BoardsList = ({ boardId }: BoardsListProps) => {
    const boards = useBoardsStore(selectBoardsList)
    const board = useBoardsStore(selectBoardById({ boardId }))

    const navigate = useNavigate()

    const handleAddNewBoard = useCallback(() => {
        board == null
            ? navigate({ to: '/boards/add' })
            : navigate({ to: '/boards/$boardId/add', params: { boardId: board.id } })
    }, [board, navigate])

    const handleGoToBoard = useCallback(
        (boardId: Board['id']) => {
            navigate({ to: '/boards/$boardId', params: { boardId } })
        },
        [navigate]
    )

    return (
        <>
            <h2 className="pl-6 pt-4 text-h-s uppercase text-grey-500">
                All boards ({boards.length})
            </h2>

            <div className="flex flex-1 flex-col overflow-hidden">
                <ScrollArea className="mb-1 flex flex-col">
                    <ul className="flex flex-col gap-1 overflow-hidden overflow-y-auto pr-6">
                        {boards.map((board) => {
                            const isSelected = board.id === boardId

                            return (
                                <BoardsListItem
                                    board={board}
                                    key={board.id}
                                    onClick={handleGoToBoard}
                                    variant={isSelected ? 'selected' : undefined}
                                />
                            )
                        })}
                    </ul>
                </ScrollArea>

                <div className="mr-6">
                    <BoardsListItem variant="new" onClick={handleAddNewBoard} />
                </div>
            </div>
        </>
    )
}

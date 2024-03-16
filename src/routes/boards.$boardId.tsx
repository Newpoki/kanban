import { Board } from '@/board/board'
import { BoardNotFound } from '@/board/board-not-found'
import { BoardsDrawer } from '@/boards/boards-drawer'
import { selectBoardById } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boards/$boardId')({
    component: BoardComponent,
})

function BoardComponent() {
    const { boardId } = Route.useParams()

    const board = useBoardsStore(selectBoardById({ boardId }))

    return (
        <div className="flex min-h-[100dvh]">
            <BoardsDrawer boardId={boardId} />
            {board != null ? <Board board={board} /> : <BoardNotFound />}
        </div>
    )
}

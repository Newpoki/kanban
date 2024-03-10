import { Board } from '@/board/board'
import { BoardNotFound } from '@/board/board-not-found'
import { BoardsDrawer } from '@/boards/boards-drawer'
import { useBoardsStore } from '@/boards/boards-store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boards/$boardId')({
    component: BoardsComponent,
})

function BoardsComponent() {
    const { boardId } = Route.useParams()

    const board = useBoardsStore((boardStore) => boardStore.data[boardId])

    return (
        <div className="flex min-h-[100dvh]">
            <BoardsDrawer />
            {board != null ? <Board board={board} /> : <BoardNotFound />}
        </div>
    )
}

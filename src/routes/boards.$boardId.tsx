import { Board } from '@/board/board'
import { BoardsDrawer } from '@/boards/boards-drawer'
import { useBoardsStore } from '@/boards/boards-store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boards/$boardId')({
    component: BoardsComponent,
})

function BoardsComponent() {
    const { boardId } = Route.useParams()

    const board = useBoardsStore((boardStore) => boardStore.data[boardId])

    if (board == null) {
        // TODO: Add proper 404
        return <div>not found</div>
    }

    return (
        <div className="flex min-h-[100dvh]">
            <BoardsDrawer />
            <Board board={board} />
        </div>
    )
}

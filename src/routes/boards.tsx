import { BoardsDrawer } from '@/boards/boards-drawer'
import { BoardsEmpty } from '@/boards/boards-empty'
import { selectBoardsList } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boards')({
    component: BoardsComponent,
})

function BoardsComponent() {
    const boards = useBoardsStore(selectBoardsList)

    return (
        <div className="flex min-h-[100dvh]">
            <BoardsDrawer />

            <div className="flex flex-1 bg-grey-100 dark:bg-grey-900">
                {boards.length === 0 && <BoardsEmpty />}

                <Outlet />
            </div>
        </div>
    )
}

import { Boards } from '@/boards/boards'
import { BoardsDrawer } from '@/boards/boards-drawer'
import { BoardsHeader } from '@/boards/header/boards-header'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boards')({
    component: BoardsComponent,
})

function BoardsComponent() {
    return (
        <div className="flex min-h-[100dvh]">
            <div className="flex flex-1 flex-col overflow-hidden bg-grey-100 dark:bg-grey-900">
                <BoardsHeader />

                <div className="flex flex-1">
                    <BoardsDrawer />
                    <Boards />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

import { BoardsDrawer } from '@/boards/boards-drawer'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boards')({
    component: BoardsComponent,
})

function BoardsComponent() {
    return (
        <div className="flex min-h-[100dvh]">
            <BoardsDrawer />

            <Outlet />
        </div>
    )
}

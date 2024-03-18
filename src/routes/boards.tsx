import { Boards } from '@/boards/boards'
import { BoardsDrawer } from '@/boards/boards-drawer'
import { BoardsHeader } from '@/boards/header/boards-header'
import { Toaster } from '@/components/ui/sonner'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/boards')({
    component: BoardsComponent,
})

function BoardsComponent() {
    const [isDrawerExpanded, setIsDrawerExpanded] = useState(true)

    return (
        <div className="flex min-h-[100dvh]">
            <div className="flex flex-1 flex-col overflow-hidden bg-grey-100 dark:bg-grey-900">
                <BoardsHeader isDrawerExpanded={isDrawerExpanded} />

                <div className="flex flex-1">
                    <BoardsDrawer
                        isExpanded={isDrawerExpanded}
                        setIsExpanded={setIsDrawerExpanded}
                    />
                    <Boards />
                    <Outlet />
                </div>
            </div>

            <Toaster richColors />
        </div>
    )
}

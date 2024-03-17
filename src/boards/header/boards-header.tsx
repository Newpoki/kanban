import { Button } from '@/components/ui/button'
import { Logo, Plus } from '@/icons'
import { BoardsHeaderPopover } from './boards-header-popover'
import { useRef } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { BoardsHeaderDropdown } from './boards-header-dropdown'
import { useBoardsStore } from '../boards-store'
import { selectBoardById } from '../boards-selectors'

export const BoardsHeader = () => {
    const { boardId } = useParams({ from: '/boards/$boardId' })

    const board = useBoardsStore(selectBoardById({ boardId }))

    const ref = useRef<HTMLElement>(null)

    return (
        <header
            className="flex h-16 items-center border-b-[1px] border-grey-300 bg-white px-4 py-4 dark:border-grey-700 dark:bg-grey-800 md:h-20 lg:h-24"
            ref={ref}
        >
            <Logo className="mr-4 h-5 w-6 md:hidden" />

            <BoardsHeaderPopover board={board} headerRef={ref} />

            {board != null && (
                <div className="ml-auto flex items-center gap-4">
                    {board.columns.length > 0 && (
                        <Link to="/boards/$boardId/add-task" params={{ boardId: board.id }}>
                            <Button className="px-[18px] capitalize md:hidden" size="small">
                                <Plus className="w-3 md:hidden" />
                            </Button>

                            <Button className="hidden px-[18px] capitalize md:inline-flex">
                                <Plus className="w-3 md:hidden" />
                                <span className="hidden md:block">+ Add new task</span>
                            </Button>
                        </Link>
                    )}

                    <BoardsHeaderDropdown boardId={board.id} />
                </div>
            )}
        </header>
    )
}

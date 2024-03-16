import { Button } from '@/components/ui/button'
import { Logo, Plus } from '@/icons'
import { BoardHeaderPopover } from './board-header-popover'
import { useRef } from 'react'
import { Board } from '@/boards/boards-schemas'
import { Link } from '@tanstack/react-router'
import { BoardHeaderDropdown } from './board-header-dropdown'

type BoardHeaderProps = {
    board: Board
}

export const BoardHeader = ({ board }: BoardHeaderProps) => {
    const ref = useRef<HTMLElement>(null)

    return (
        <header
            className="flex items-center border-b-[1px] border-grey-300 bg-white px-4 py-4 dark:border-grey-700 dark:bg-grey-800"
            ref={ref}
        >
            <Logo className="mr-4 h-5 w-6" />

            <BoardHeaderPopover board={board} headerRef={ref} />

            <div className="ml-auto flex items-center gap-4">
                <Link to="/boards/$boardId/add-task" params={{ boardId: board.id }}>
                    <Button className="px-[18px] capitalize md:hidden" size="small">
                        <Plus className="w-3 md:hidden" />
                    </Button>

                    <Button className="hidden px-[18px] capitalize md:inline-flex">
                        <Plus className="w-3 md:hidden" />
                        <span className="hidden md:block">+ Add new task</span>
                    </Button>
                </Link>

                <BoardHeaderDropdown boardId={board.id} />
            </div>
        </header>
    )
}

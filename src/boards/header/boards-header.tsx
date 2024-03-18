import { Button } from '@/components/ui/button'
import { Logo, Plus, LogoFull } from '@/icons'
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
            className="flex h-16 items-center bg-white pr-4 dark:bg-grey-800 md:h-20 lg:h-24"
            ref={ref}
        >
            <section className="drawer-width board-border-color flex h-full flex-shrink-0 items-center pl-6 md:border-r-[1px]">
                <Logo className="mr-4 h-5 w-6 md:hidden" />
                <LogoFull className="hidden h-6 w-[125px] fill-black dark:fill-white md:block" />
            </section>

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

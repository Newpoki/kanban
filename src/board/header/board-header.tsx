import { Button } from '@/components/ui/button'
import { FAKE_DATA } from '../../fake-data'
import { Logo, Plus, VerticalDots } from '@/icons'
import { BoardHeaderPopover } from './board-header-popover'
import { useRef } from 'react'

type BoardHeaderProps = {
    board: (typeof FAKE_DATA)[number]
}

export const BoardHeader = ({ board }: BoardHeaderProps) => {
    const ref = useRef<HTMLElement>(null)

    return (
        <header
            className="flex items-center border-b-[1px] border-grey-300 px-4 py-4 dark:border-grey-700 dark:bg-grey-800"
            ref={ref}
        >
            <Logo className="mr-4 h-5 w-6" />

            <BoardHeaderPopover board={board} headerRef={ref} />

            <div className="ml-auto flex items-center gap-4">
                <Button size="icon">
                    <Plus className="w-3" />
                </Button>

                <VerticalDots className="h-4 w-2" />
            </div>
        </header>
    )
}

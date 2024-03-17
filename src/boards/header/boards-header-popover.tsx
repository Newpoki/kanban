import { Chevron } from '@/icons'

import {
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverOverlay,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useCallback, useState } from 'react'
import { ThemeSelector } from '@/theme/theme-selector'
import { BoardsList } from '@/boards/boards-list'
import { Board } from '@/boards/boards-schemas'

type BoardsHeaderPopoverProps = {
    board: Board | undefined
    headerRef: React.RefObject<HTMLElement>
}

export const BoardsHeaderPopover = ({ board, headerRef }: BoardsHeaderPopoverProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const popoverTopPosition = headerRef?.current?.getBoundingClientRect()?.bottom

    const displayedBoardName = board?.name ?? 'No board selected'

    const handleToggleIsOpen = useCallback((newIsOpen: boolean) => {
        setIsOpen(newIsOpen)
    }, [])

    return (
        <>
            <Popover modal open={isOpen} onOpenChange={handleToggleIsOpen}>
                <PopoverOverlay style={{ top: popoverTopPosition }} open={isOpen} />

                <PopoverTrigger className="mr-3 flex max-w-[250px] items-center gap-3 md:hidden">
                    <h1 className="truncate text-h-l dark:text-white">{displayedBoardName}</h1>

                    <Chevron className="h-2 w-3" />
                </PopoverTrigger>

                <h1 className="mr-4 hidden truncate text-h-l dark:text-white md:block lg:text-h-xl">
                    {displayedBoardName}
                </h1>

                <PopoverAnchor virtualRef={headerRef} />

                <PopoverContent className="flex flex-col p-0" sideOffset={10}>
                    <BoardsList boardId={board?.id} />

                    <ThemeSelector className="m-4" />
                </PopoverContent>
            </Popover>
        </>
    )
}

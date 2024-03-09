import { Chevron } from '@/icons'
import { FAKE_DATA } from '@/fake-data'

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

type BoardHeaderPopoverProps = {
    board: (typeof FAKE_DATA)[number]
    headerRef: React.RefObject<HTMLElement>
}

export const BoardHeaderPopover = ({ board, headerRef }: BoardHeaderPopoverProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const popoverTopPosition = headerRef?.current?.getBoundingClientRect()?.bottom

    const handleToggleIsOpen = useCallback((newIsOpen: boolean) => {
        setIsOpen(newIsOpen)
    }, [])

    return (
        <>
            <Popover modal open={isOpen} onOpenChange={handleToggleIsOpen}>
                <PopoverOverlay style={{ top: popoverTopPosition }} open={isOpen} />

                <PopoverTrigger className="flex items-center md:hidden">
                    <h1 className="mr-2 text-h-l dark:text-white">{board.name}</h1>

                    <Chevron className="h-2 w-3" />
                </PopoverTrigger>

                <h1 className="mr-2 hidden text-h-l dark:text-white md:block">{board.name}</h1>

                <PopoverAnchor virtualRef={headerRef} />

                <PopoverContent className="flex flex-col p-0" sideOffset={10}>
                    <BoardsList />

                    <ThemeSelector className="m-4" />
                </PopoverContent>
            </Popover>
        </>
    )
}

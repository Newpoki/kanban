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
import { BoardListItem } from '../board-list-item'
import { ThemeSelector } from '@/theme/theme-selector'

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

                <PopoverTrigger className="flex items-center">
                    <h1 className="mr-2 text-h-l dark:text-white">{board.name}</h1>

                    <Chevron className="h-2 w-3" />
                </PopoverTrigger>

                <PopoverAnchor virtualRef={headerRef} />

                <PopoverContent className="flex flex-col p-0" sideOffset={10}>
                    <h2 className="pb-5 pl-6 pt-4 text-h-s uppercase text-grey-500">
                        All boards ({FAKE_DATA.length})
                    </h2>

                    <div className="pr-6">
                        {FAKE_DATA.map((board, index) => {
                            // TODO: check url to know if displayed board
                            const isSelected = index === 0

                            return (
                                <BoardListItem
                                    key={board.id}
                                    board={board}
                                    variant={isSelected ? 'selected' : undefined}
                                />
                            )
                        })}
                    </div>

                    <BoardListItem variant="new" />

                    <ThemeSelector className="m-4" />
                </PopoverContent>
            </Popover>
        </>
    )
}

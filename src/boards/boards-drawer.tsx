import { Eye, EyeSlash } from '@/icons'
import { BoardsList } from './boards-list'
import { ThemeSelector } from '@/theme/theme-selector'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { useParams } from '@tanstack/react-router'

export const BoardsDrawer = () => {
    const [isExpanded, setIsExpanded] = useState(true)

    const { boardId } = useParams({ from: '/boards/$boardId' })

    const handleToggleDrawer = useCallback(() => {
        setIsExpanded((currentIsExpanded) => !currentIsExpanded)
    }, [])

    return (
        <>
            <div
                className={cn(
                    'drawer-width board-border-color hidden flex-shrink-0 overflow-hidden border-r-[1px] bg-white pb-8  transition-width dark:bg-grey-800 md:flex md:h-[calc(100dvh_-_80px)] md:flex-col lg:h-[calc(100dvh_-_96px)]',
                    {
                        'w-0 md:w-0 lg:w-0': !isExpanded,
                    }
                )}
            >
                {/* Set the width again on the child without transition here so drawer content doesn't visually expanded */}
                {/* when opening the drawer */}
                <div className="flex w-[260px] flex-1 flex-col gap-5 overflow-hidden lg:w-[300px]">
                    <BoardsList boardId={boardId} />

                    <div className="mt-auto">
                        <ThemeSelector className="mx-3 mb-2 lg:mx-6" />

                        <div
                            className="mr-3 flex items-center gap-[10px] rounded-br-3xl rounded-tr-3xl px-6  py-[14px] text-grey-500 transition-colors hover:bg-purple-500/10 hover:text-purple-500  dark:hover:bg-white lg:mr-6"
                            onClick={handleToggleDrawer}
                            role="button"
                        >
                            <EyeSlash className="h-4 w-[18px]" />
                            <span className="text-h-m">Hide Sidebar</span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className={cn(
                    'group fixed bottom-8 left-0 z-40 hidden h-12 w-14 -translate-x-full items-center rounded-br-3xl  rounded-tr-3xl bg-purple-500 px-5 transition-all hover:w-[260px] hover:bg-purple-500/10 dark:hover:bg-white md:flex md:gap-4',
                    {
                        'translate-x-0': !isExpanded,
                    }
                )}
                onClick={handleToggleDrawer}
            >
                <Eye className="h-[10px] w-4 shrink-0 group-hover:hidden" />
                <EyeSlash className="hidden h-[14px] w-[18px] shrink-0 text-purple-500 group-hover:flex" />
                <span
                    className={cn(
                        'text-purple overflow-hidden whitespace-nowrap text-h-m transition-all group-hover:text-purple-500'
                    )}
                >
                    Show sidebar
                </span>
            </button>
        </>
    )
}

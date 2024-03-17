import { Eye, EyeSlash, LogoFull } from '@/icons'
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
                    'hidden w-[260px] flex-shrink-0 overflow-hidden border-r-[1px] border-grey-300 pb-8 pt-8 transition-width dark:border-grey-700 dark:bg-grey-800 md:flex md:flex-col',
                    {
                        'w-0': !isExpanded,
                    }
                )}
            >
                {/* // Set the width again on the child without transition here so drawer content doesn't visually expanded */}
                {/* when opening the drawer */}
                <div className="flex w-[260px] flex-1 flex-col">
                    <section className="mb-10 flex items-center gap-4 pl-[26px]">
                        <LogoFull className="h-6 w-[125px] fill-black dark:fill-white" />
                    </section>

                    <BoardsList boardId={boardId} />

                    <div className="mt-auto">
                        <ThemeSelector className="mx-3 mb-4" />

                        <button
                            className="flex items-center gap-[10px] px-6 py-[14px]"
                            onClick={handleToggleDrawer}
                        >
                            <EyeSlash className="h-4 w-[18px]" />
                            <span className="text-h-m text-grey-500">Hide Sidebar</span>
                        </button>
                    </div>
                </div>
            </div>

            <button
                className={cn(
                    'fixed bottom-8 left-0 z-40 hidden -translate-x-full rounded-br-3xl rounded-tr-3xl bg-purple-500 p-5 transition-transform md:block',
                    {
                        'translate-x-0': !isExpanded,
                    }
                )}
                onClick={handleToggleDrawer}
            >
                <Eye className="h-[10px] w-4" />
            </button>
        </>
    )
}

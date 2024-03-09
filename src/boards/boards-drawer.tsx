import { EyeSlash, LogoFull } from '@/icons'
import { BoardsList } from './boards-list'
import { ThemeSelector } from '@/theme/theme-selector'

export const BoardsDrawer = () => {
    return (
        <div className="hidden w-[260px] flex-shrink-0 border-r-[1px] border-grey-300 pb-8 pt-8 dark:border-grey-700 dark:bg-grey-800 md:flex md:flex-col">
            <section className="mb-10 flex items-center gap-4 pl-[26px]">
                <LogoFull className="h-6 w-[125px] fill-black dark:fill-white" />
            </section>

            <BoardsList />

            <div className="mt-auto">
                <ThemeSelector className="mx-3 mb-4" />

                <button className="flex items-center gap-[10px] px-6 py-[14px]">
                    <EyeSlash className="h-4 w-[18px]" />
                    <span className="text-h-m text-grey-500">Hide Sidebar</span>
                </button>
            </div>
        </div>
    )
}

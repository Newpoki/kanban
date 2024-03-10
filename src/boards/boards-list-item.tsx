import { Board as BoardIcon } from '@/icons'
import { cn } from '@/lib/utils'
import { BoardListItem } from './boards-atoms'

type BoardsListItemPropsRegular = {
    board: BoardListItem
    variant?: 'selected'
}

type BoardsListItemPropsNew = {
    variant: 'new'
}

type BoardsListItemProps = BoardsListItemPropsRegular | BoardsListItemPropsNew

export const BoardsListItem = (props: BoardsListItemProps) => {
    return (
        <li
            className={cn(
                'flex w-[240px] cursor-pointer list-none items-center gap-3 rounded-br-3xl rounded-tr-3xl px-6 py-[15px] text-grey-500 transition-colors hover:bg-purple-500/10 hover:text-purple-500 dark:hover:bg-white',
                {
                    'bg-purple-500 text-white hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white':
                        props.variant === 'selected',
                    'text-purple-500': props.variant === 'new',
                }
            )}
        >
            <BoardIcon className="h-4 w-4 flex-shrink-0" />

            <h3 className="truncate text-h-m">
                {props.variant === 'new' ? '+ Create New Board' : props.board.name}
            </h3>
        </li>
    )
}

import { FAKE_DATA } from '@/fake-data'
import { Board } from '@/icons'
import { cn } from '@/lib/utils'

type BoardsListItemPropsRegular = {
    board: (typeof FAKE_DATA)[number]
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
                'flex w-[240px] items-center gap-3 rounded-br-3xl rounded-tr-3xl px-6 py-4 text-grey-500',
                {
                    'bg-purple-500 text-white': props.variant === 'selected',
                    'text-purple-500': props.variant === 'new',
                }
            )}
        >
            <Board className="h-4 w-4 flex-shrink-0" />

            <h3 className="truncate text-h-m">
                {props.variant === 'new' ? '+Create New Board' : props.board.name}
            </h3>
        </li>
    )
}

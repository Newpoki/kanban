import { Board as BoardIcon } from '@/icons'
import { cn } from '@/lib/utils'
import { Board } from './boards-schemas'
import { useCallback } from 'react'

type BoardsListItemPropsRegular = {
    board: Board
    variant?: 'selected'
    onClick: (boardId: Board['id']) => void
}

type BoardsListItemPropsNew = {
    variant: 'new'
    onClick: () => void
}

type BoardsListItemProps = BoardsListItemPropsRegular | BoardsListItemPropsNew

export const BoardsListItem = (props: BoardsListItemProps) => {
    const handleClick = useCallback(() => {
        props.variant === 'new' ? props.onClick() : props.onClick(props.board.id)
    }, [props])

    return (
        <button className="w-full overflow-hidden rounded-br-3xl rounded-tr-3xl">
            <li
                className={cn(
                    'flex w-full items-center gap-3 px-6 py-[15px] text-grey-500 transition-colors hover:bg-purple-500/10 hover:text-purple-500 dark:hover:bg-white',
                    {
                        'bg-purple-500 text-white hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white':
                            props.variant === 'selected',
                        'text-purple-500': props.variant === 'new',
                    }
                )}
                onClick={handleClick}
            >
                <BoardIcon className="h-4 w-4 flex-shrink-0" />

                <h3 className="truncate text-h-m">
                    {props.variant === 'new' ? '+ Create New Board' : props.board.name}
                </h3>
            </li>
        </button>
    )
}

import { Board } from '@/boards/boards-schemas'
import { Link } from '@tanstack/react-router'

type BoardColumnPlaceholderProps = {
    boardId: Board['id']
}

export const BoardColumnPlaceholder = ({ boardId }: BoardColumnPlaceholderProps) => {
    return (
        <Link
            to="/boards/$boardId/edit"
            params={{ boardId }}
            className="mt-10 flex w-[280px] flex-shrink-0 items-center justify-center rounded-md bg-column-placeholder-bg dark:bg-dark-column-placeholder-bg"
        >
            <h3 className="text-h-xl text-grey-500">+ New Column</h3>
        </Link>
    )
}

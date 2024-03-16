import { BoardColumn } from '@/boards/boards-schemas'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import { BoardColumnDroppableData } from './board-schemas'

type BoardColumnDroppableProps = {
    column: BoardColumn
}

export const BoardColumnDroppable = ({ column }: BoardColumnDroppableProps) => {
    const droppableData: BoardColumnDroppableData = { columnId: column.id }

    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
        data: droppableData,
    })

    return (
        <div
            className={cn(
                'flex w-full flex-1 flex-col items-center justify-center rounded-md bg-purple-300/25 transition-colors',
                {
                    'bg-purple-300/75': isOver,
                }
            )}
            ref={setNodeRef}
        >
            <div
                className={cn(
                    'flex items-center gap-2 rounded-md bg-white/75 px-2 py-1 dark:bg-black/25 dark:text-grey-100',
                    { 'dark:bg-black/50': isOver }
                )}
            >
                <div className="h-4 w-4 rounded-full" style={{ background: column.color }} />
                <span>{column.name}</span>
            </div>
        </div>
    )
}

import {
    Board,
    BoardColumn,
    BoardColumnTask,
    BoardColumnTaskSubtask,
} from '@/boards/boards-schemas'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useBoardsStore } from '@/boards/boards-store'
import { useCallback } from 'react'
import { toast } from 'sonner'

type TaskDialogSubtaskProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    taskId: BoardColumnTask['id']
    subtask: BoardColumnTaskSubtask
}

export const TaskDialogSubtask = ({
    boardId,
    columnId,
    taskId,
    subtask,
}: TaskDialogSubtaskProps) => {
    const changeSubtaskStatus = useBoardsStore((store) => store.changeSubtaskStatus)

    const isDone = subtask.status === 'done'

    const handleChangeSubtaskStatus = useCallback(() => {
        changeSubtaskStatus({ boardId, columnId, taskId, id: subtask.id })

        toast.info("Task subtask's has been updated")
    }, [boardId, changeSubtaskStatus, columnId, subtask.id, taskId])

    return (
        <label className="flex cursor-pointer items-center gap-4 rounded-[4px] bg-grey-100 p-3 text-m hover:bg-purple-500/25 dark:bg-grey-900 dark:text-white hover:dark:bg-purple-500/25">
            <Checkbox
                key={subtask.id}
                checked={subtask.status === 'done'}
                onCheckedChange={handleChangeSubtaskStatus}
            />
            <span
                className={cn({
                    'text-black/50 line-through dark:text-white/50': isDone,
                })}
            >
                {subtask.name}
            </span>
        </label>
    )
}

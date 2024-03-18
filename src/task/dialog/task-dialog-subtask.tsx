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
    grabHandle?: React.ReactNode
    taskId: BoardColumnTask['id']
    subtask: BoardColumnTaskSubtask
}

export const TaskDialogSubtask = ({
    boardId,
    columnId,
    grabHandle,
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
        <label
            className="flex w-full cursor-pointer items-center gap-2 rounded-[4px] bg-grey-100 py-2 pl-2  pr-3 text-m transition-colors hover:bg-purple-500/25 dark:bg-grey-900 dark:text-white hover:dark:bg-purple-500/25"
            // Must provide htmlFor as there might be a button element that will get focused by the label before the checkbox
            htmlFor={subtask.id}
        >
            {grabHandle}
            <Checkbox
                id={subtask.id}
                key={subtask.id}
                checked={subtask.status === 'done'}
                onCheckedChange={handleChangeSubtaskStatus}
                className="mr-4"
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

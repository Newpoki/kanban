import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import { useBoardsStore } from '@/boards/boards-store'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { toast } from 'sonner'

type TaskDialogColumnSelectProps = {
    boardId: Board['id']
    column: BoardColumn
    task: BoardColumnTask
}

export const TaskDialogColumnSelect = ({ boardId, column, task }: TaskDialogColumnSelectProps) => {
    const changeTaskColumn = useBoardsStore((store) => store.changeTaskColumn)

    const statusesOptions = useBoardsStore((boardsStore) => {
        return (
            boardsStore.data[boardId]?.columns.map((column) => ({
                name: column.name,
                id: column.id,
            })) ?? []
        )
    })

    const navigate = useNavigate()

    const handleChangeTaskColumn = useCallback(
        (nextColumnId: BoardColumn['id']) => {
            // This should never happen as we would not be able to diplay the task
            if (column == null) {
                return
            }

            changeTaskColumn({
                boardId,
                currentColumnId: column?.id,
                nextColumnId,
                taskId: task.id,
            })

            toast.info("Task column's has been updated")

            // Also updating the url so if user refresh, the subtask is still displayed
            navigate({
                to: '/boards/$boardId/column/$columnId/task/$taskId',
                params: { boardId, columnId: nextColumnId, taskId: task.id },
            })
        },
        [boardId, changeTaskColumn, column, navigate, task.id]
    )

    if (statusesOptions.length === 0) {
        return null
    }

    return (
        <section>
            <h3 className="mb-2 text-m text-grey-500 dark:text-white">Current status</h3>

            <Select defaultValue={column.id} onValueChange={handleChangeTaskColumn}>
                <SelectTrigger className="w-full whitespace-normal">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {statusesOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </section>
    )
}

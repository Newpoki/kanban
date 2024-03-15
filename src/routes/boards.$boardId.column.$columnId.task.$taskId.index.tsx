import { BoardColumn } from '@/boards/boards-schemas'
import { selectBoardsTask } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import {
    Dialog,
    DialogContent,
    DialogContentInner,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Subtask } from '@/subtask/subtask'
import { TaskDropdown } from '@/task/task-dropdown'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/column/$columnId/task/$taskId/')({
    component: BoardTaskComponent,
})

function BoardTaskComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const { boardId, columnId, taskId } = Route.useParams()
    const navigate = useNavigate()

    const taskColumn = useBoardsStore((boardsStore) => {
        return boardsStore.data[boardId]?.columns.find((column) => column.id === columnId)
    })

    const changeTaskColumn = useBoardsStore((store) => store.changeTaskColumn)

    const task = useBoardsStore(selectBoardsTask({ boardId, taskId }))

    const statusesOptions = useBoardsStore((boardsStore) => {
        return (
            boardsStore.data[boardId]?.columns.map((column) => ({
                name: column.name,
                id: column.id,
            })) ?? []
        )
    })

    const handleToggleDialog = useCallback(() => {
        setIsOpen(false)

        // Wait for the dialog animation to be done before redirecting
        // so the close is smooth
        setTimeout(() => {
            navigate({ to: '/boards/$boardId', params: { boardId } })
        }, 300)
    }, [boardId, navigate])

    const handleChangeTaskColumn = useCallback(
        (nextColumnId: BoardColumn['id']) => {
            // This should never happen as we would not be able to diplay the task
            if (taskColumn == null) {
                return
            }

            changeTaskColumn({ boardId, currentColumnId: taskColumn?.id, nextColumnId, taskId })

            // Also updating the url so if user refresh, the subtask is still displayed
            navigate({
                to: '/boards/$boardId/column/$columnId/task/$taskId',
                params: { boardId, columnId: nextColumnId, taskId },
            })
        },
        [boardId, changeTaskColumn, navigate, taskColumn, taskId]
    )

    if (task == null) {
        // TODO: handle proper task not found screen
        return <div>not found</div>
    }

    const doneCount = task.subtasks.filter((subtask) => subtask.status === 'done').length

    return (
        <Dialog open={isOpen} onOpenChange={handleToggleDialog}>
            <DialogContent className="pb-8">
                <DialogHeader className="justify-between gap-4">
                    <DialogTitle>{task.name}</DialogTitle>

                    <TaskDropdown boardId={boardId} columnId={columnId} taskId={taskId} />
                </DialogHeader>

                <DialogContentInner>
                    <p className="text-l text-grey-500">{task.description}</p>

                    <section>
                        <h3 className="mb-4 text-m text-grey-500 dark:text-white">
                            Subtasks ({doneCount} of {task.subtasks.length})
                        </h3>

                        <ul className="flex flex-col gap-2">
                            {task.subtasks.map((subtask) => {
                                return (
                                    <Subtask
                                        key={subtask.id}
                                        boardId={boardId}
                                        columnId={columnId}
                                        taskId={taskId}
                                        subtask={subtask}
                                    />
                                )
                            })}
                        </ul>
                    </section>

                    {taskColumn != null && statusesOptions.length > 0 && (
                        <section>
                            <h3 className="mb-2 text-m text-grey-500 dark:text-white">
                                Current status
                            </h3>

                            <Select
                                defaultValue={taskColumn.id}
                                onValueChange={handleChangeTaskColumn}
                            >
                                <SelectTrigger className="w-full">
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
                    )}
                </DialogContentInner>
            </DialogContent>
        </Dialog>
    )
}

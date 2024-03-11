import { useBoardsStore } from '@/boards/boards-store'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { VerticalDots } from '@/icons'
import { Subtask } from '@/subtask/subtask'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/column/$columnId/task/$taskId')({
    component: BoardTaskComponent,
})

function BoardTaskComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const { boardId, columnId, taskId } = Route.useParams()
    const navigate = useNavigate()

    const taskColumn = useBoardsStore((boardsStore) => {
        return boardsStore.data[boardId]?.columns.find((column) => column.id === columnId)
    })

    const task = useBoardsStore((boardsStore) => {
        return boardsStore.data[boardId]?.columns
            .flatMap((column) => column.tasks)
            .find((task) => task.id === taskId)
    })

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
                    <VerticalDots className="h-5 w-2" />
                </DialogHeader>

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

                        <Select defaultValue={taskColumn.id}>
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
            </DialogContent>
        </Dialog>
    )
}

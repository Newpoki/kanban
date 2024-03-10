import { useBoardsStore } from '@/boards/boards-store'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { VerticalDots } from '@/icons'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/task/$taskId')({
    component: BoardTaskComponent,
})

function BoardTaskComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const { boardId, taskId } = Route.useParams()
    const navigate = useNavigate()

    const task = useBoardsStore((boardStore) => {
        return boardStore.data[boardId].columns
            .flatMap((column) => column.tasks)
            .find((task) => task.id === taskId)
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
            <DialogContent>
                <DialogHeader className="justify-between gap-4">
                    <DialogTitle>{task.name}</DialogTitle>
                    <VerticalDots className="h-5 w-2" />
                </DialogHeader>

                <p className="text-l text-grey-500">{task.description}</p>

                <section>
                    <h3 className="mb-4 text-m text-grey-500">
                        Subtasks ({doneCount} of {task.subtasks.length})
                    </h3>
                </section>
            </DialogContent>
        </Dialog>
    )
}

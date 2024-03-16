import { TaskDialog } from '@/task/dialog/task-dialog'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/column/$columnId/task/$taskId/')({
    component: BoardTaskComponent,
})

function BoardTaskComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const { boardId, columnId, taskId } = Route.useParams()

    const handleCloseDialog = useCallback(() => {
        setIsOpen(false)

        // Wait for the dialog animation to be done before redirecting
        // so the close is smooth
        setTimeout(() => {
            navigate({ to: '/boards/$boardId', params: { boardId } })
        }, 300)
    }, [boardId, navigate])

    return (
        <TaskDialog
            boardId={boardId}
            isOpen={isOpen}
            onClose={handleCloseDialog}
            columnId={columnId}
            taskId={taskId}
        />
    )
}

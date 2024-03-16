import { TaskAddOrEditDialog } from '@/task/add-or-edit-dialog/task-add-or-edit-dialog'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/column/$columnId/task/$taskId/edit')({
    component: BoardTaskEditTaskComponent,
})

function BoardTaskEditTaskComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const { boardId, taskId, columnId } = Route.useParams()

    const handleCloseDialog = useCallback(() => {
        setIsOpen(false)

        // Wait for the dialog animation to be done before redirecting
        // so the close is smooth
        setTimeout(() => {
            navigate({ to: '/boards/$boardId', params: { boardId } })
        }, 300)
    }, [boardId, navigate])

    return (
        <TaskAddOrEditDialog
            boardId={boardId}
            isOpen={isOpen}
            onClose={handleCloseDialog}
            taskId={taskId}
            columnId={columnId}
        />
    )
}

import { TaskCreate } from '@/task/task-create'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/add')({
    component: BoardTaskCreateTaskComponent,
})

function BoardTaskCreateTaskComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const { boardId } = Route.useParams()

    const handleCloseDialog = useCallback(() => {
        setIsOpen(false)

        // Wait for the dialog animation to be done before redirecting
        // so the close is smooth
        setTimeout(() => {
            navigate({ to: '/boards/$boardId', params: { boardId } })
        }, 300)
    }, [boardId, navigate])

    return <TaskCreate boardId={boardId} isOpen={isOpen} onClose={handleCloseDialog} />
}

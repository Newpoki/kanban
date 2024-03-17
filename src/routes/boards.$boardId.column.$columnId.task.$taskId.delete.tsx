import { selectBoardTask } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import { TaskDeleteDialog } from '@/task/task-delete-dialog'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/column/$columnId/task/$taskId/delete')({
    component: BoardTaskDeleteTaskComponent,
})

function BoardTaskDeleteTaskComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const { boardId, columnId, taskId } = Route.useParams()

    const task = useBoardsStore(selectBoardTask({ boardId, taskId }))

    const handleCloseDialog = useCallback(
        (callback?: () => void) => {
            setIsOpen(false)

            // Wait for the dialog animation to be done before redirecting
            // so the close is smooth
            setTimeout(() => {
                navigate({ to: '/boards/$boardId', params: { boardId } })

                callback?.()
            }, 300)
        },
        [boardId, navigate]
    )

    if (task == null) {
        return null
    }

    return (
        <TaskDeleteDialog
            isOpen={isOpen}
            onClose={handleCloseDialog}
            boardId={boardId}
            columnId={columnId}
            task={task}
        />
    )
}

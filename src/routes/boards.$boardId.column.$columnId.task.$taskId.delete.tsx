import { selectBoardsTask } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/column/$columnId/task/$taskId/delete')({
    component: BoardTaskDeleteTaskComponent,
})

function BoardTaskDeleteTaskComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const { boardId, columnId, taskId } = Route.useParams()

    const deleteTask = useBoardsStore((store) => store.deleteTask)

    const task = useBoardsStore(selectBoardsTask({ boardId, taskId }))

    const handleToggleDialog = useCallback(() => {
        setIsOpen(false)

        // Wait for the dialog animation to be done before redirecting
        // so the close is smooth
        setTimeout(() => {
            navigate({ to: '/boards/$boardId', params: { boardId } })
        }, 300)
    }, [boardId, navigate])

    const handleDeleteTask = useCallback(() => {
        setIsOpen(false)

        // Wait for the dialog animation to be done before redirecting
        // so the close is smooth
        setTimeout(() => {
            navigate({ to: '/boards/$boardId', params: { boardId } })

            deleteTask({ boardId, columnId, taskId })
        }, 300)

        // navigate({ to: '/boards/$boardId', params: { boardId } })
    }, [boardId, columnId, deleteTask, navigate, taskId])

    if (task == null) {
        return null
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={handleToggleDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the <b>{task?.name} </b>
                        task and its subtasks? This action cannot be reversed.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteTask}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

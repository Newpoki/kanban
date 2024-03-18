import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
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
import { useCallback } from 'react'
import { toast } from 'sonner'

type TaskDeleteDialogProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    task: BoardColumnTask
    isOpen: boolean
    onClose: (callback?: () => void) => void
}

export const TaskDeleteDialog = ({
    boardId,
    columnId,
    task,
    isOpen,
    onClose,
}: TaskDeleteDialogProps) => {
    const deleteTask = useBoardsStore((store) => store.deleteTask)

    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    const handleDeleteTask = useCallback(() => {
        onClose(() => {
            deleteTask({ boardId, columnId, taskId: task.id })

            toast.info('Task has been deleted')
        })
    }, [boardId, columnId, deleteTask, onClose, task.id])

    return (
        <AlertDialog open={isOpen} onOpenChange={handleClose}>
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

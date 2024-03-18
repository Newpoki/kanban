import { Board } from '@/boards/boards-schemas'
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
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { toast } from 'sonner'

type BoardDeleteDialogProps = {
    board: Board
    isOpen: boolean
    onClose: (callback?: () => void) => void
}

export const BoardDeleteDialog = ({ board, isOpen, onClose }: BoardDeleteDialogProps) => {
    const deleteTask = useBoardsStore((store) => store.deleteBoard)

    const navigate = useNavigate()

    const handleClose = useCallback(() => {
        onClose(() => {
            navigate({ to: '/boards/$boardId', params: { boardId: board.id } })
        })
    }, [board.id, navigate, onClose])

    const handleDeleteTask = useCallback(() => {
        onClose(() => {
            deleteTask({ boardId: board.id })

            toast.info('Board has been deleted')
        })
    }, [board.id, deleteTask, onClose])

    return (
        <AlertDialog open={isOpen} onOpenChange={handleClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this board?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the <b>{board?.name} </b>
                        board? This action will remove all columns and tasks and cannot be reversed.
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

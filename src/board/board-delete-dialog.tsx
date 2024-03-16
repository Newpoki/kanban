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
import { useCallback } from 'react'

type BoardDeleteDialogProps = {
    board: Board
    isOpen: boolean
    onClose: (callback?: () => void) => void
}

export const BoardDeleteDialog = ({ board, isOpen, onClose }: BoardDeleteDialogProps) => {
    const deleteTask = useBoardsStore((store) => store.deleteBoard)

    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    const handleDeleteTask = useCallback(() => {
        onClose(() => {
            deleteTask({ boardId: board.id })
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

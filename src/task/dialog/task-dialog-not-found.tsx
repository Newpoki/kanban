import {
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { AlertDialog } from '@radix-ui/react-alert-dialog'

type TaskDialogNotFoundProps = {
    isOpen: boolean
    onClose: () => void
}

export const TaskDialogNotFound = ({ isOpen, onClose }: TaskDialogNotFoundProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Task not found</AlertDialogTitle>
                    <AlertDialogDescription>
                        We are facing an issue trying to display the requested task
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

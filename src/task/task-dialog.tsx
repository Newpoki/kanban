import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Board } from '@/boards/boards-schemas'
import { TaskDialogForm } from './task-dialog-form'

type TaskProps = {
    boardId: Board['id']
    isOpen: boolean
    onClose: () => void
}

export const TaskDialog = ({ boardId, isOpen, onClose }: TaskProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="pb-8">
                <DialogHeader className="justify-between gap-4">
                    <DialogTitle>Add new task</DialogTitle>
                </DialogHeader>

                <TaskDialogForm boardId={boardId} />
            </DialogContent>
        </Dialog>
    )
}

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import { TaskDialogForm } from './task-dialog-form'

type TaskProps = {
    boardId: Board['id']
    isOpen: boolean
    onClose: () => void
    columnId?: BoardColumn['id']
    taskId?: BoardColumnTask['id']
}

export const TaskDialog = ({ boardId, isOpen, onClose, columnId, taskId }: TaskProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="pb-8">
                <DialogHeader className="justify-between gap-4">
                    <DialogTitle>Add new task</DialogTitle>
                </DialogHeader>

                <TaskDialogForm boardId={boardId} columnId={columnId} taskId={taskId} />
            </DialogContent>
        </Dialog>
    )
}

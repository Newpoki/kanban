import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import { TaskAddOrEditDialogForm } from './task-add-or-edit-dialog-form'

type TaskProps = {
    boardId: Board['id']
    isOpen: boolean
    onClose: () => void
    columnId?: BoardColumn['id']
    taskId?: BoardColumnTask['id']
}

export const TaskAddOrEditDialog = ({ boardId, isOpen, onClose, columnId, taskId }: TaskProps) => {
    const isEditing = taskId != null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="pb-8">
                <DialogHeader className="justify-between gap-4">
                    <DialogTitle>{isEditing ? 'Edit task' : 'Add new task'}</DialogTitle>
                </DialogHeader>

                <TaskAddOrEditDialogForm
                    boardId={boardId}
                    columnId={columnId}
                    isEditing={isEditing}
                    taskId={taskId}
                />
            </DialogContent>
        </Dialog>
    )
}

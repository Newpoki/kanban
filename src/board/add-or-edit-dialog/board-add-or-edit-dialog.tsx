import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Board } from '@/boards/boards-schemas'
import { useBoardsStore } from '@/boards/boards-store'
import { selectBoardById } from '@/boards/boards-selectors'
import { BoardAddOrEditDialogForm } from './board-add-or-edit-dialog-form'

type BoardAddOrEditDialogProps = {
    boardId?: Board['id']
    isOpen: boolean
    onClose: () => void
}

export const BoardAddOrEditDialog = ({ boardId, isOpen, onClose }: BoardAddOrEditDialogProps) => {
    const board = useBoardsStore(selectBoardById({ boardId }))

    const isEditing = board != null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="pb-8">
                <DialogHeader className="justify-between gap-4">
                    <DialogTitle>{isEditing ? 'Edit board' : 'Add new board'}</DialogTitle>
                </DialogHeader>

                <BoardAddOrEditDialogForm board={board} isEditing={isEditing} />
            </DialogContent>
        </Dialog>
    )
}

import { BoardAddOrEditDialog } from '@/board/add-or-edit-dialog/board-add-or-edit-dialog'
import { Board } from '@/boards/boards-schemas'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/edit')({
    component: BoardEditComponent,
})

function BoardEditComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const { boardId } = Route.useParams()

    const handleCloseDialog = useCallback(() => {
        setIsOpen(false)

        // Wait for the dialog animation to be done before redirecting
        // so the close is smooth
        setTimeout(() => {
            navigate({ to: '/boards/$boardId', params: { boardId } })
        }, 300)
    }, [boardId, navigate])

    const handleBoardCreated = useCallback(
        (editedBoardId: Board['id']) => {
            setIsOpen(false)

            setTimeout(() => {
                navigate({ to: '/boards/$boardId', params: { boardId: editedBoardId } })
            }, 300)
        },
        [navigate]
    )

    return (
        <BoardAddOrEditDialog
            boardId={boardId}
            isOpen={isOpen}
            onClose={handleCloseDialog}
            onSuccess={handleBoardCreated}
        />
    )
}

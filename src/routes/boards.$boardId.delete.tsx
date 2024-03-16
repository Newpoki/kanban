import { BoardDeleteDialog } from '@/board/board-delete-dialog'
import { selectBoardById } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/delete')({
    component: BoardDeleteComponent,
})

function BoardDeleteComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    const { boardId } = Route.useParams()

    const board = useBoardsStore(selectBoardById({ boardId }))

    const handleCloseDialog = useCallback(
        (callback?: () => void) => {
            setIsOpen(false)

            // Wait for the dialog animation to be done before redirecting
            // so the close is smooth
            setTimeout(() => {
                navigate({ to: '/boards/$boardId', params: { boardId } })

                callback?.()
            }, 300)
        },
        [boardId, navigate]
    )

    if (board == null) {
        // TODO: Add error screen for no board found
        return <p>not found</p>
    }

    return <BoardDeleteDialog isOpen={isOpen} onClose={handleCloseDialog} board={board} />
}

import { BoardDeleteDialog } from '@/board/board-delete-dialog'
import { selectBoardById } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/delete')({
    component: BoardDeleteComponent,
})

function BoardDeleteComponent() {
    const [isOpen, setIsOpen] = useState(true)

    const { boardId } = Route.useParams()

    const board = useBoardsStore(selectBoardById({ boardId }))

    const handleCloseDialog = useCallback((callback?: () => void) => {
        setIsOpen(false)

        // Wait for the dialog animation to be done before redirecting
        // so the close is smooth
        setTimeout(() => {
            callback?.()
        }, 300)
    }, [])

    if (board == null) {
        // There is nothing to handle as if the board id doesnt match any existing board
        // there is a dedicated screen for the no board found
        return null
    }

    return <BoardDeleteDialog isOpen={isOpen} onClose={handleCloseDialog} board={board} />
}

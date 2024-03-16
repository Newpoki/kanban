import { BoardAddOrEditDialog } from '@/board/add-or-edit-dialog/board-add-or-edit-dialog'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/boards/$boardId/add')({
    component: BoardAddComponent,
})

function BoardAddComponent() {
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

    return <BoardAddOrEditDialog isOpen={isOpen} onClose={handleCloseDialog} />
}

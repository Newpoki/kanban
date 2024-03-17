import { Board } from '@/boards/boards-schemas'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

type BoardEmptyProps = {
    boardId: Board['id']
}

export const BoardEmpty = ({ boardId }: BoardEmptyProps) => {
    const navigate = useNavigate()

    const handleEditBoard = useCallback(() => {
        navigate({ to: '/boards/$boardId/edit', params: { boardId } })
    }, [boardId, navigate])

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-7 text-center md:px-16">
            <h2 className="text-h-l text-grey-500">
                This board is empty. Create a new column to get started.
            </h2>

            <Button onClick={handleEditBoard}>+ Add new column</Button>
        </main>
    )
}

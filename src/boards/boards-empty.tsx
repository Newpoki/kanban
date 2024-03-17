import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

export const BoardsEmpty = () => {
    const navigate = useNavigate()

    const handleCreateBoard = useCallback(() => {
        navigate({ to: '/boards/add' })
    }, [navigate])

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-7 text-center md:px-16">
            <h2 className="text-h-l text-grey-500">
                You have no boards yet. Start your journey by creating a new board
            </h2>

            <Button onClick={handleCreateBoard}>+ Add new board</Button>
        </main>
    )
}

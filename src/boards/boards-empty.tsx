import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

export const BoardsEmpty = () => {
    const navigate = useNavigate()

    const handleCreateBoard = useCallback(() => {
        navigate({ to: '/boards/add' })
    }, [navigate])

    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-grey-100 px-6 text-center dark:bg-grey-900 dark:text-white">
            <h1 className="text-h-xl">No boards found</h1>
            <p className="mb-4 text-h-m">
                You have no boards yet. Start your journey by creating a new board
            </p>

            <Button onClick={handleCreateBoard} size="small">
                + Add new board
            </Button>
        </div>
    )
}

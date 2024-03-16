import { Button } from '@/components/ui/button'

export const BoardEmpty = () => {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <h2 className="text-h-l text-grey-500">
                This board is empty. Create a new column to get started.
            </h2>

            <Button>+ Add new column</Button>
        </main>
    )
}

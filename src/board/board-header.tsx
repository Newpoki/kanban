import { Button } from '@/components/ui/button'
import { FAKE_DATA } from '../fake-data'
import { Chevron, Logo, Plus } from '@/icons'

type BoardHeaderProps = {
    board: typeof FAKE_DATA
}

export const BoardHeader = ({ board }: BoardHeaderProps) => {
    return (
        <header className="flex items-center px-4 py-5">
            <Logo className="mr-4 w-6" />

            <h1 className="mr-2 text-h-l">{board.name}</h1>
            <Chevron className="h-2 w-3" />

            <div className="ml-auto">
                <Button size="icon">
                    <Plus className="w-3" />
                </Button>
            </div>
        </header>
    )
}

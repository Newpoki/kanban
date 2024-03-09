import { Button } from '@/components/ui/button'
import { FAKE_DATA } from '../fake-data'
import { Chevron, Logo, Plus, VerticalDots } from '@/icons'

type BoardHeaderProps = {
    board: typeof FAKE_DATA
}

export const BoardHeader = ({ board }: BoardHeaderProps) => {
    return (
        <header className="flex items-center px-4 py-4">
            <Logo className="mr-4 h-5 w-6" />

            <h1 className="mr-2 text-h-l">{board.name}</h1>

            <Chevron className="h-2 w-3" />

            <div className="ml-auto flex items-center gap-4">
                <Button size="icon">
                    <Plus className="w-3" />
                </Button>

                <VerticalDots className="h-4 w-2" />
            </div>
        </header>
    )
}

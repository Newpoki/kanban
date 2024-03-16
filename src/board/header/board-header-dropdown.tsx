import { Board } from '@/boards/boards-schemas'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { VerticalDots } from '@/icons'
import { Link } from '@tanstack/react-router'

type BoardHeaderDropdownProps = {
    boardId: Board['id']
}

export const BoardHeaderDropdown = ({ boardId }: BoardHeaderDropdownProps) => {
    return (
        <DropdownMenu
            // Must use modal={false} otherwise the AlertDialog will leave `event-pointer: none`
            // on the body, resulting in app unusable
            modal={false}
        >
            <DropdownMenuTrigger>
                <div className="flex px-2">
                    <VerticalDots className="h-5 w-1" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={24} align="end">
                <Link to="/boards/$boardId/edit" params={{ boardId }}>
                    <DropdownMenuItem>Edit board</DropdownMenuItem>
                </Link>
                <Link to="/boards/$boardId/delete" params={{ boardId }}>
                    <DropdownMenuItem className="text-red-500 focus:bg-red-500/30 focus:text-red-500 dark:text-red-500 focus:dark:bg-red-500/30 dark:focus:text-red-500">
                        <span className="text-l">Delete board</span>
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

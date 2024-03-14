import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { VerticalDots } from '@/icons'
import { Link } from '@tanstack/react-router'

type TaskDropdownProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    taskId: BoardColumnTask['id']
}

export const TaskDropdown = ({ boardId, columnId, taskId }: TaskDropdownProps) => {
    return (
        <DropdownMenu
            // Must use modal={false} otherwise the AlertDialog will leave `event-pointer: none`
            // on the body, resulting in app unusable
            modal={false}
        >
            <DropdownMenuTrigger>
                <div className="flex px-2">
                    <VerticalDots className="h-5 w-2" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={16}>
                <DropdownMenuItem>Edit task</DropdownMenuItem>
                <Link
                    to="/boards/$boardId/column/$columnId/task/$taskId/delete"
                    params={{ boardId, columnId, taskId }}
                >
                    <DropdownMenuItem className="text-red-500 focus:bg-red-500/30 focus:text-red-500 dark:text-red-500 focus:dark:bg-red-500/30 dark:focus:text-red-500">
                        <span className="text-l">Delete task</span>
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

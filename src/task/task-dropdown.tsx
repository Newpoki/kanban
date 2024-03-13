import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { VerticalDots } from '@/icons'

export const TaskDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex px-2">
                    <VerticalDots className="h-5 w-2" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={16}>
                <DropdownMenuItem>Edit task</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 focus:bg-red-500/30 focus:text-red-500 dark:text-red-500 focus:dark:bg-red-500/30 dark:focus:text-red-500">
                    <span className="text-l">Delete task</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

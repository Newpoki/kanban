import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FieldLabel } from '@/components/ui/field-label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TaskSubtaskField } from './task-subtask-field'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useBoardsStore } from '@/boards/boards-store'
import { Board } from '@/boards/boards-schemas'

type TaskCreateProps = {
    boardId: Board['id']
    isOpen: boolean
    onClose: () => void
}

export const TaskCreate = ({ boardId, isOpen, onClose }: TaskCreateProps) => {
    const statusesOptions = useBoardsStore((boardsStore) => {
        return (
            boardsStore.data[boardId]?.columns.map((column) => ({
                name: column.name,
                id: column.id,
            })) ?? []
        )
    })

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="pb-8">
                <DialogHeader className="justify-between gap-4">
                    <DialogTitle>Add new task</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <FieldLabel htmlFor="name">Title</FieldLabel>

                    <Input placeholder="e.g. Take coffee break" id="name" name="name" />
                </div>

                <div className="flex flex-col gap-2">
                    <FieldLabel htmlFor="description">Description</FieldLabel>

                    <Textarea
                        placeholder="e.g. Take coffee break"
                        id="description"
                        name="description"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <FieldLabel htmlFor="subtasks">Subtasks</FieldLabel>

                    <div className="flex flex-col gap-3">
                        <TaskSubtaskField placeholder="e.g. Make coffee" />
                        <TaskSubtaskField placeholder="e.g. Drink coffee & smile" />
                    </div>

                    <Button variant="secondary" size="small">
                        + Add New Subtask
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    <FieldLabel>Status</FieldLabel>

                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {statusesOptions.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button size="small">Create Task</Button>
            </DialogContent>
        </Dialog>
    )
}

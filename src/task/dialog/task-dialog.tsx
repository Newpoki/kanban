import {
    Dialog,
    DialogContent,
    DialogContentInner,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { TaskDialogDropdown } from './task-dialog-dropdown'
import { useBoardsStore } from '@/boards/boards-store'
import { selectBoardTask } from '@/boards/boards-selectors'
import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import { cn } from '@/lib/utils'
import { TaskDialogSubtask } from './task-dialog-subtask'
import { TaskDialogColumnSelect } from './task-dialog-column-select'
import { TaskDialogNotFound } from './task-dialog-not-found'

type TaskDialogProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    taskId: BoardColumnTask['id']
    isOpen: boolean
    onClose: () => void
}

export const TaskDialog = ({ boardId, columnId, taskId, isOpen, onClose }: TaskDialogProps) => {
    const task = useBoardsStore(selectBoardTask({ boardId, taskId }))

    const column = useBoardsStore((boardsStore) => {
        return boardsStore.data[boardId]?.columns.find((column) => column.id === columnId)
    })

    if (task == null) {
        return <TaskDialogNotFound isOpen={isOpen} onClose={onClose} />
    }

    const doneCount = task.subtasks.filter((subtask) => subtask.status === 'done').length

    const hasNoDescription = task.description.length === 0
    const hasNoSubtasks = task.subtasks.length === 0

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="pb-8">
                <DialogHeader className="justify-between gap-4">
                    <DialogTitle>{task.name}</DialogTitle>

                    <TaskDialogDropdown boardId={boardId} columnId={columnId} taskId={taskId} />
                </DialogHeader>

                <DialogContentInner>
                    <p className={cn('text-l text-grey-500', { italic: hasNoDescription })}>
                        {hasNoDescription ? 'No description yet' : task.description}
                    </p>

                    <section>
                        <h3
                            className={cn('mb-4 text-m text-grey-500 dark:text-white', {
                                italic: hasNoSubtasks,
                            })}
                        >
                            {hasNoSubtasks
                                ? 'No subtasks yet'
                                : `Subtasks (${doneCount} of ${task.subtasks.length})`}
                        </h3>

                        <ul className="flex flex-col gap-2">
                            {task.subtasks.map((subtask) => {
                                return (
                                    <TaskDialogSubtask
                                        key={subtask.id}
                                        boardId={boardId}
                                        columnId={columnId}
                                        taskId={taskId}
                                        subtask={subtask}
                                    />
                                )
                            })}
                        </ul>
                    </section>

                    {column != null && (
                        <TaskDialogColumnSelect boardId={boardId} column={column} task={task} />
                    )}
                </DialogContentInner>
            </DialogContent>
        </Dialog>
    )
}

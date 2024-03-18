import {
    Board,
    BoardColumn,
    BoardColumnTask,
    BoardColumnTaskSubtask,
} from '@/boards/boards-schemas'
import { DndContext, DragOverEvent } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { TaskDialogSubtaskDraggable } from './task-dialog-subtask-draggable'
import { useCallback } from 'react'
import { TaskDialogSubtaskDraggableData } from '../task-schemas'
import { useBoardsStore } from '@/boards/boards-store'

type TaskDialogSubtasksProps = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    taskId: BoardColumnTask['id']
    subtasks: BoardColumnTaskSubtask[]
}

export const TaskDialogSubtasks = ({
    boardId,
    columnId,
    taskId,
    subtasks,
}: TaskDialogSubtasksProps) => {
    const changeSubtaskIndex = useBoardsStore((boardStore) => boardStore.changeSubtaskIndex)

    const handleDragOver = useCallback(
        ({ active, over }: DragOverEvent) => {
            if (over == null) {
                return
            }

            if (active.data.current == null || over.data.current == null) {
                return
            }

            const activeData = active.data.current as TaskDialogSubtaskDraggableData

            const overData = over.data.current as TaskDialogSubtaskDraggableData

            changeSubtaskIndex({
                boardId,
                columnId,
                taskId,
                oldIndex: activeData.subtaskIndex,
                newIndex: overData.subtaskIndex,
            })
        },
        [boardId, changeSubtaskIndex, columnId, taskId]
    )

    return (
        <DndContext onDragOver={handleDragOver}>
            <SortableContext items={subtasks} strategy={rectSortingStrategy}>
                <ul className="flex flex-col gap-2">
                    {subtasks.map((subtask, index) => {
                        return (
                            <TaskDialogSubtaskDraggable
                                key={subtask.id}
                                boardId={boardId}
                                index={index}
                                columnId={columnId}
                                taskId={taskId}
                                subtask={subtask}
                            />
                        )
                    })}
                </ul>
            </SortableContext>

            {/* Should use a drag overlay to have better animations but for some reasons it does breaks the whole drag and drop */}
        </DndContext>
    )
}

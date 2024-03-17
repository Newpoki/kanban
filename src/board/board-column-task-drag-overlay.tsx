import { DragOverlay, useDndContext } from '@dnd-kit/core'
import { BoardColumnTask } from './board-column-task'
import { BoardColumnTaskDraggableData } from './board-schemas'
import { Board } from '@/boards/boards-schemas'

type BoardColumnTaskDragOverlayProps = {
    boardId: Board['id']
}

export const BoardColumnTaskDragOverlay = ({ boardId }: BoardColumnTaskDragOverlayProps) => {
    const { active } = useDndContext()

    const activeData = active?.data.current as BoardColumnTaskDraggableData

    return (
        <DragOverlay>
            {activeData?.taskId != null ? (
                <BoardColumnTask boardId={boardId} taskId={activeData.taskId} />
            ) : null}
        </DragOverlay>
    )
}

import { Board } from '@/boards/boards-schemas'
import { useBoardsStore } from '@/boards/boards-store'
import {
    DragEndEvent,
    DragOverEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { useCallback, useMemo } from 'react'
import { BoardColumnDroppableData, BoardColumnTaskDraggableData } from './board-schemas'

type UseBoardDndInput = {
    board: Board
}

export const useBoardDnd = ({ board }: UseBoardDndInput) => {
    const changeTaskColumn = useBoardsStore((store) => store.changeTaskColumn)
    const changeTaskIndex = useBoardsStore((store) => store.changeTaskIndex)

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 8,
        },
    })

    const sensors = useSensors(mouseSensor, touchSensor)

    const handleDragOver = useCallback(
        ({ active, over }: DragOverEvent) => {
            if (over == null) {
                return
            }

            const activeData = active.data.current as BoardColumnTaskDraggableData
            // As we're using SortableContext, it can be undefined when dragging over a column
            // in an area where there is no task
            const overData = over?.data.current as BoardColumnDroppableData | undefined

            const currentColumnId = activeData.sortable.containerId
            const overedColumnId = overData?.sortable.containerId || (over.id as string)

            if (currentColumnId === overedColumnId) {
                return
            }

            const targetedColumn = board.columns.find((column) => column.id === overedColumnId)
            const overIndex =
                targetedColumn != null ? targetedColumn.tasks.length + 1 : overData?.sortable.index

            changeTaskColumn({
                boardId: board.id,
                currentColumnId,
                nextColumnId: overedColumnId,
                taskId: activeData.taskId,
                taskIndex: overIndex,
            })
        },
        [board.columns, board.id, changeTaskColumn]
    )

    const handleDragEnd = useCallback(
        ({ active, over }: DragEndEvent) => {
            if (over == null) {
                return
            }

            if (active.id === over.id) {
                return
            }

            const activeData = active.data.current as BoardColumnTaskDraggableData
            // As we're using SortableContext, it can be undefined when dragging over a column
            // in an area where there is no task
            const overData = over?.data.current as BoardColumnDroppableData | undefined

            const activeIndex = activeData.sortable.index
            // Safe to cast as the unique id for droppable / draggable elements are task or column id
            // and those are always string generated with uuidv4
            const overedColumnId = overData?.sortable.containerId || (over.id as string)

            const targetedColumn = board.columns.find((column) => column.id === over.id)

            const newTaskIndex =
                targetedColumn != null ? targetedColumn.tasks.length + 1 : overData?.sortable.index

            if (newTaskIndex == null || overedColumnId == null) {
                return
            }

            changeTaskIndex({
                boardId: board.id,
                columnId: overedColumnId,
                newIndex: newTaskIndex,
                oldIndex: activeIndex,
            })
        },
        [board.columns, board.id, changeTaskIndex]
    )

    return useMemo(
        () => ({
            sensors,
            onDragOver: handleDragOver,
            onDragEnd: handleDragEnd,
        }),
        [handleDragEnd, handleDragOver, sensors]
    )
}

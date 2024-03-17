import { Board, BoardColumn } from '@/boards/boards-schemas'
import { useBoardsStore } from '@/boards/boards-store'
import { useCallback, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BoardAddOrEditDialogFormValues } from '../board-schemas'

type UseBoardFormInput = {
    board: Board | undefined
    onSuccess: (boardId: Board['id']) => void
}

export const useBoardForm = ({ board, onSuccess }: UseBoardFormInput) => {
    const addBoard = useBoardsStore((store) => store.addBoard)

    const editBoard = useBoardsStore((store) => store.editBoard)

    const isEditing = board != null

    const defaultValues = useMemo<BoardAddOrEditDialogFormValues>(() => {
        if (board == null) {
            return {
                id: uuidv4(),
                name: '',
                columns: [],
            }
        }

        return {
            id: board.id,
            name: board.name,
            columns: board.columns.map((column) => ({
                color: column.color,
                id: column.id,
                name: column.name,
            })),
        }
    }, [board])

    const handleCreateBoard = useCallback(
        (formValues: BoardAddOrEditDialogFormValues) => {
            const createdBoard: Board = {
                id: formValues.id,
                name: formValues.name,
                columns: formValues.columns.map((column) => ({ ...column, tasks: [] })),
            }

            addBoard({ board: createdBoard })
        },
        [addBoard]
    )

    const handleEditBoard = useCallback(
        (formValues: BoardAddOrEditDialogFormValues, editedBoard: Board) => {
            const updatedBoard: Board = {
                ...formValues,
                columns: formValues.columns.map<BoardColumn>((column) => {
                    const currentColumn = editedBoard.columns.find(
                        (currentColumn) => currentColumn.id === column.id
                    )

                    // This means this is a newly created column, so there is no tasks
                    if (currentColumn == null) {
                        return { ...column, tasks: [] }
                    }

                    return { ...currentColumn, ...column }
                }),
            }

            editBoard({ board: updatedBoard })
        },
        [editBoard]
    )

    const handleSubmit = useCallback(
        (formValues: BoardAddOrEditDialogFormValues) => {
            isEditing ? handleEditBoard(formValues, board) : handleCreateBoard(formValues)

            onSuccess(formValues.id)
        },
        [board, handleCreateBoard, handleEditBoard, isEditing, onSuccess]
    )
    return useMemo(
        () => ({
            defaultValues,
            onSubmit: handleSubmit,
        }),
        [defaultValues, handleSubmit]
    )
}
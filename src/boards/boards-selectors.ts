import { Board, BoardColumnTask } from './boards-schemas'
import { BoardsStore } from './boards-store'

type SelectBoardsTaskInput = {
    boardId: Board['id']
    taskId: BoardColumnTask['id'] | undefined
}

type SelectBoardByIdInput = {
    boardId: Board['id'] | undefined
}

export const selectBoardTask =
    ({ boardId, taskId }: SelectBoardsTaskInput) =>
    (boardsStore: BoardsStore) => {
        return boardsStore.data[boardId]?.columns
            .flatMap((column) => column.tasks)
            .find((task) => task.id === taskId)
    }

export const selectBoardById =
    ({ boardId }: SelectBoardByIdInput) =>
    (boardsStore: BoardsStore) => {
        return boardId != null ? boardsStore.data[boardId] : undefined
    }

export const selectBoardsList = (boardsStore: BoardsStore) => Object.values(boardsStore.data)

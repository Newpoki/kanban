import { Board, BoardColumnTask } from './boards-schemas'
import { BoardsStore } from './boards-store'

type SelectBoardsTaskInput = {
    boardId: Board['id']
    taskId: BoardColumnTask['id'] | undefined
}

type SelectBoardByIdInput = {
    boardId: Board['id'] | undefined
}

export const selectBoardsTask =
    ({ boardId, taskId }: SelectBoardsTaskInput) =>
    (boardsStore: BoardsStore) => {
        return boardsStore.data[boardId]?.columns
            .flatMap((column) => column.tasks)
            .find((task) => task.id === taskId)
    }

export const selectBoardById =
    ({ boardId }: SelectBoardByIdInput) =>
    (boardsStore: BoardsStore) => {
        return boardsStore.data[boardId]
    }

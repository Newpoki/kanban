import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import {
    Board,
    BoardColumn,
    BoardColumnTask,
    BoardColumnTaskSubtask,
    BoardsMap,
    boardsMapSchema,
} from './boards-schemas'
import { persist } from 'zustand/middleware'

const DEFAULT_BOARD: Board = {
    id: uuidv4(),
    name: 'Default board',
    columns: [
        {
            color: '#49C4E5',
            id: uuidv4(),
            name: 'todo',
            tasks: [
                {
                    id: uuidv4(),
                    name: 'Build UI for onboarding flow',
                    description:
                        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'The first subtask',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'The second subtask',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'The third subtask',
                            status: 'pending',
                        },
                    ],
                },
                {
                    id: uuidv4(),
                    name: 'Build UI for search',
                    description:
                        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'The first subtask',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'The second subtask',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'The third subtask',
                            status: 'pending',
                        },
                    ],
                },
                {
                    id: uuidv4(),
                    name: 'Build UI for onboarding flow',
                    description:
                        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'The first subtask',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'The second subtask',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'The third subtask',
                            status: 'pending',
                        },
                    ],
                },
                {
                    id: uuidv4(),
                    name: 'Build UI for search',
                    description:
                        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'The first subtask',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'The second subtask',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'The third subtask',
                            status: 'pending',
                        },
                    ],
                },
                {
                    id: uuidv4(),
                    name: 'Build UI for onboarding flow',
                    description:
                        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'The first subtask',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'The second subtask',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'The third subtask',
                            status: 'pending',
                        },
                    ],
                },
                {
                    id: uuidv4(),
                    name: 'Build UI for search',
                    description:
                        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'The first subtask',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'The second subtask',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'The third subtask',
                            status: 'pending',
                        },
                    ],
                },
            ],
        },
        {
            color: '#8471F2',
            id: uuidv4(),
            name: 'doing',
            tasks: [
                {
                    id: uuidv4(),
                    name: 'DOING UI for onboarding flow',
                    description:
                        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'The first subtask',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'The second subtask',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'The third subtask',
                            status: 'pending',
                        },
                    ],
                },
                {
                    id: uuidv4(),
                    name: 'DOING UI for search',
                    description:
                        "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'The first subtask',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'The second subtask',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'The third subtask',
                            status: 'pending',
                        },
                    ],
                },
            ],
        },
    ],
}

const getInitialBoardsMap = (): BoardsMap => {
    const boardsFromLS = localStorage.getItem('boards')

    const parsedBoardsMapFromLS = boardsMapSchema.safeParse(boardsFromLS)

    if (parsedBoardsMapFromLS.success) {
        return parsedBoardsMapFromLS.data
    }

    return {
        [DEFAULT_BOARD.id]: DEFAULT_BOARD,
    }
}

type ChangeSubtaskStatusPayload = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    taskId: BoardColumnTask['id']
    id: BoardColumnTaskSubtask['id']
}

type BoardsStore = {
    data: BoardsMap
    changeSubtaskStatus: (payload: ChangeSubtaskStatusPayload) => void
}

export const useBoardsStore = create(
    persist<BoardsStore>(
        (set, get) => ({
            data: getInitialBoardsMap(),
            changeSubtaskStatus: ({ boardId, columnId, taskId, id }) => {
                const board = get().data[boardId]

                if (board == null) {
                    return
                }

                const updatedBoard: Board = {
                    ...board,
                    columns: board.columns.map((column) => {
                        if (column.id !== columnId) {
                            return column
                        }

                        return {
                            ...column,
                            tasks: column.tasks.map((task) => {
                                if (task.id !== taskId) {
                                    return task
                                }

                                return {
                                    ...task,
                                    subtasks: task.subtasks.map((subtask) => {
                                        if (subtask.id !== id) {
                                            return subtask
                                        }

                                        return {
                                            ...subtask,
                                            status: subtask.status === 'done' ? 'pending' : 'done',
                                        }
                                    }),
                                }
                            }),
                        }
                    }),
                }

                set((state) => ({ data: { ...state.data, [boardId]: updatedBoard } }))
            },
        }),
        { name: 'boards-map' }
    )
)

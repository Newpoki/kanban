import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { Board, BoardsMap, boardsMapSchema } from './boards-schemas'
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

type BoardsStore = {
    data: BoardsMap
}

export const useBoardsStore = create(
    persist<BoardsStore>(
        () => {
            return {
                data: getInitialBoardsMap(),
            }
        },
        {
            name: 'boards-map',
        }
    )
)

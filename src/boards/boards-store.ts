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
import omit from 'lodash.omit'
import { insertAtIndex } from '@/lib/insert-at-index'
import { arrayMove, arraySwap } from '@dnd-kit/sortable'

const DEFAULT_BOARD: Board = {
    id: uuidv4(),
    name: 'My first board',
    columns: [
        {
            color: '#49C4E5',
            id: uuidv4(),
            name: 'Todo',
            tasks: [
                {
                    id: uuidv4(),
                    name: 'Create a new column',
                    description: 'Having meaning full columns helps maintaing a good workflow',
                    subtasks: [],
                },
                {
                    id: uuidv4(),
                    name: 'Create a new task',
                    description: 'Scheduling a new task is always exciting !',
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'Thinking about a good name and description',
                            status: 'done',
                        },
                        {
                            id: uuidv4(),
                            name: 'Write down the task',
                            status: 'pending',
                        },
                    ],
                },
                {
                    id: uuidv4(),
                    name: 'Try the drag and drop feature',
                    description:
                        'You can easily drag a task from a column to another, or even drag a task inside its own column to change the tasks order. Try it yourself',
                    subtasks: [
                        {
                            id: uuidv4(),
                            name: 'Drag a task to another column',
                            status: 'pending',
                        },
                        {
                            id: uuidv4(),
                            name: 'Drag a task inside the same column to re order tasks',
                            status: 'pending',
                        },
                    ],
                },
            ],
        },
        {
            color: '#654321',
            id: uuidv4(),
            name: 'Doing',
            tasks: [
                {
                    id: uuidv4(),
                    name: 'Discovers main features',
                    subtasks: [],
                    description: '',
                },
            ],
        },
        {
            color: '#8471F2',
            id: uuidv4(),
            name: 'Done',
            tasks: [
                {
                    id: uuidv4(),
                    name: 'Create my first board !',
                    description: "Congratulations ! This is your first board. Let's fill it",
                    subtasks: [],
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

type ChangeTaskIndexPayload = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    oldIndex: number
    newIndex: number
}

type ChangeTaskColumnPayload = {
    boardId: Board['id']
    currentColumnId: BoardColumn['id']
    nextColumnId: BoardColumn['id']
    taskId: BoardColumnTask['id']
    taskIndex?: number
}

type DeleteTaskPayload = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    taskId: BoardColumnTask['id']
}

type AddTaskPayload = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    task: BoardColumnTask
}

type EditTaskPayload = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    task: BoardColumnTask
}

type AddBoardPayload = {
    board: Board
}

type EditBoardPayload = {
    board: Board
}

type DeleteBoardPayload = {
    boardId: Board['id']
}

type ChangeSubtaskIndexPayload = {
    boardId: Board['id']
    columnId: BoardColumn['id']
    taskId: BoardColumnTask['id']
    oldIndex: number
    newIndex: number
}

export type BoardsStore = {
    data: BoardsMap
    changeSubtaskStatus: (payload: ChangeSubtaskStatusPayload) => void
    changeTaskIndex: (payload: ChangeTaskIndexPayload) => void
    changeTaskColumn: (payload: ChangeTaskColumnPayload) => void
    changeSubtaskIndex: (payload: ChangeSubtaskIndexPayload) => void
    deleteTask: (payload: DeleteTaskPayload) => void
    addTask: (payload: AddTaskPayload) => void
    editTask: (payload: EditTaskPayload) => void
    addBoard: (payload: AddBoardPayload) => void
    editBoard: (payload: EditBoardPayload) => void
    deleteBoard: (payload: DeleteBoardPayload) => void
}

export const useBoardsStore = create(
    persist<BoardsStore>(
        (set, get) => ({
            data: getInitialBoardsMap(),
            changeSubtaskIndex: ({ boardId, columnId, taskId, newIndex, oldIndex }) => {
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
                                    subtasks: arraySwap(task.subtasks, oldIndex, newIndex),
                                }
                            }),
                        }
                    }),
                }

                set((state) => ({
                    data: { ...state.data, [boardId]: updatedBoard },
                }))
            },
            deleteBoard: ({ boardId }) => {
                set((state) => ({ data: omit(state.data, [boardId]) }))
            },
            addBoard: ({ board }) => {
                set((state) => ({ data: { ...state.data, [board.id]: board } }))
            },
            editBoard: ({ board }) => {
                set((state) => ({ data: { ...state.data, [board.id]: board } }))
            },
            editTask: ({ boardId, columnId, task: editedTask }) => {
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
                                if (task.id !== editedTask.id) {
                                    return task
                                }

                                return editedTask
                            }),
                        }
                    }),
                }

                set((state) => ({ data: { ...state.data, [boardId]: updatedBoard } }))
            },
            addTask: ({ boardId, columnId, task: createdTask }) => {
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

                        return { ...column, tasks: [...column.tasks, createdTask] }
                    }),
                }

                set((state) => ({ data: { ...state.data, [boardId]: updatedBoard } }))
            },
            deleteTask: ({ boardId, columnId, taskId }) => {
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
                            tasks: column.tasks.filter((task) => task.id !== taskId),
                        }
                    }),
                }

                set((state) => ({ data: { ...state.data, [boardId]: updatedBoard } }))
            },
            changeTaskIndex: ({ boardId, columnId, oldIndex, newIndex }) => {
                const board = get().data[boardId]

                if (board == null) {
                    return
                }

                const updatedBoard: Board = {
                    ...board,
                    columns: board.columns.map((column) => {
                        if (column.id === columnId) {
                            return {
                                ...column,
                                tasks: arrayMove(column.tasks, oldIndex, newIndex),
                            }
                        }

                        return column
                    }),
                }

                set((state) => ({
                    data: { ...state.data, [boardId]: updatedBoard },
                }))
            },
            changeTaskColumn: ({ boardId, currentColumnId, nextColumnId, taskId, taskIndex }) => {
                const board = get().data[boardId]

                if (board == null) {
                    return
                }

                const task = board.columns
                    .flatMap((column) => column.tasks)
                    .find((task) => task.id === taskId)

                if (task == null) {
                    return
                }

                const updatedBoard: Board = {
                    ...board,
                    columns: board.columns.map((column) => {
                        if (column.id === currentColumnId) {
                            return {
                                ...column,
                                tasks: column.tasks.filter((task) => task.id !== taskId),
                            }
                        }

                        if (column.id === nextColumnId) {
                            const reOrderedTasks =
                                taskIndex != null
                                    ? insertAtIndex(column.tasks, taskIndex, task)
                                    : [...column.tasks, task]

                            return { ...column, tasks: reOrderedTasks }
                        }

                        return column
                    }),
                }

                set((state) => ({ data: { ...state.data, [boardId]: updatedBoard } }))
            },
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

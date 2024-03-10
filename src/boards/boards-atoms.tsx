import { Color } from '@/lib/color'
import { v4 as uuidv4 } from 'uuid'

type BoardColumnTaskSubtaskStatus = 'pending' | 'done'

type BoardColumnTaskSubtask = {
    id: string
    name: string
    status: BoardColumnTaskSubtaskStatus
}

type BoardColumnTask = {
    id: string
    name: string
    subtasks: BoardColumnTaskSubtask[]
}

type BoardColumn = {
    color: Color
    id: string
    name: string
    tasks: BoardColumnTask[]
}

export type Board = {
    id: string
    name: string
    columns: BoardColumn[]
}

export type BoardListItem = {
    id: Board['id']
    name: Board['name']
}

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

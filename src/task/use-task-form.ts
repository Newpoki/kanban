import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import { selectBoardsTask } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import { useCallback, useMemo } from 'react'
import { TaskDialogFormValues } from './task-schemas'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from '@tanstack/react-router'

type UseTaskFormInput = {
    boardId: Board['id']
    taskId?: BoardColumnTask['id']
    columnId?: BoardColumn['id']
}

export const useTaskForm = ({ boardId, taskId, columnId }: UseTaskFormInput) => {
    const task = useBoardsStore(selectBoardsTask({ boardId, taskId }))

    const statusesOptions = useBoardsStore((boardsStore) => {
        return (
            boardsStore.data[boardId]?.columns.map((column) => ({
                label: column.name,
                value: column.id,
            })) ?? []
        )
    })

    const addTask = useBoardsStore((store) => store.addTask)

    const editTask = useBoardsStore((store) => store.editTask)

    const navigate = useNavigate()

    const defaultValues = useMemo(() => {
        if (task != null && columnId != null) {
            return {
                description: task.description,
                name: task.name,
                status: columnId,
                subtasks: task.subtasks,
            }
        }

        return {
            description: '',
            name: '',
            status: statusesOptions[0]?.value,
            subtasks: [],
        }
    }, [columnId, statusesOptions, task])

    const handleCreateTask = useCallback(
        (formValues: TaskDialogFormValues) => {
            const createdTask: BoardColumnTask = {
                id: uuidv4(),
                description: formValues.description,
                name: formValues.name,
                subtasks: formValues.subtasks.map((subtask) => ({
                    ...subtask,
                    status: 'pending',
                })),
            }

            addTask({ boardId, columnId: formValues.status, task: createdTask })
        },
        [addTask, boardId]
    )

    const handleEditTask = useCallback(
        (formValues: TaskDialogFormValues, task: BoardColumnTask) => {
            const editedTask: BoardColumnTask = {
                ...task,
                description: formValues.description,
                name: formValues.name,
                subtasks: formValues.subtasks.map((subtask) => ({
                    ...subtask,
                    status: 'pending',
                })),
            }

            editTask({ boardId, columnId: formValues.status, task: editedTask })
        },
        [boardId, editTask]
    )

    const handleSubmit = useCallback(
        (formValues: TaskDialogFormValues) => {
            const isEditing = task != null

            isEditing ? handleEditTask(formValues, task) : handleCreateTask(formValues)

            navigate({ to: '/boards/$boardId', params: { boardId } })
        },
        [boardId, handleCreateTask, handleEditTask, navigate, task]
    )
    return useMemo(
        () => ({
            defaultValues,
            statusesOptions,
            onSubmit: handleSubmit,
        }),
        [defaultValues, handleSubmit, statusesOptions]
    )
}

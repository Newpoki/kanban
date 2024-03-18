import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import { selectBoardTask } from '@/boards/boards-selectors'
import { useBoardsStore } from '@/boards/boards-store'
import { useCallback, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from '@tanstack/react-router'
import { TaskAddOrEditDialogFormValues } from '../task-schemas'
import { toast } from 'sonner'

type UseTaskFormInput = {
    boardId: Board['id']
    taskId?: BoardColumnTask['id']
    columnId?: BoardColumn['id']
}

export const useTaskForm = ({ boardId, taskId, columnId }: UseTaskFormInput) => {
    const task = useBoardsStore(selectBoardTask({ boardId, taskId }))

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

    const defaultValues = useMemo<TaskAddOrEditDialogFormValues | undefined>(() => {
        const boardFirstColumn = statusesOptions[0]

        // This should never happen as we can't create a task when having no column yet
        if (boardFirstColumn == null) {
            return undefined
        }

        if (task == null || columnId == null) {
            return {
                description: '',
                name: '',
                status: boardFirstColumn.value,
                subtasks: [],
            }
        }

        return {
            description: task.description,
            name: task.name,
            status: columnId,
            subtasks: task.subtasks,
        }
    }, [columnId, statusesOptions, task])

    const handleCreateTask = useCallback(
        (formValues: TaskAddOrEditDialogFormValues) => {
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

            toast.info('Task has been created')
        },
        [addTask, boardId]
    )

    const handleEditTask = useCallback(
        (formValues: TaskAddOrEditDialogFormValues, task: BoardColumnTask) => {
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

            toast.info('Task has been edited')
        },
        [boardId, editTask]
    )

    const handleSubmit = useCallback(
        (formValues: TaskAddOrEditDialogFormValues) => {
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

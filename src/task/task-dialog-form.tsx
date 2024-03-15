import { useBoardsStore } from '@/boards/boards-store'
import { Board, BoardColumnTask } from '@/boards/boards-schemas'
import { useForm } from 'react-hook-form'
import { TaskDialogFormValues, taskDialogFormValuesSchema } from './task-schemas'
import { useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledForm } from '@/components/form/controlled-form'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from '@tanstack/react-router'
import { TaskDialogFormContent } from './task-dialog-form-content'

type TaskDialogFormProps = {
    boardId: Board['id']
}

export const TaskDialogForm = ({ boardId }: TaskDialogFormProps) => {
    const addTask = useBoardsStore((store) => store.addTask)
    const navigate = useNavigate()

    const statusesOptions = useBoardsStore((boardsStore) => {
        return (
            boardsStore.data[boardId]?.columns.map((column) => ({
                label: column.name,
                value: column.id,
            })) ?? []
        )
    })

    const formContext = useForm<TaskDialogFormValues>({
        defaultValues: {
            description: '',
            name: '',
            status: statusesOptions[0]?.value,
            subtasks: [],
        },
        resolver: zodResolver(taskDialogFormValuesSchema),
    })

    const handleSubmit = useCallback(
        (formValues: TaskDialogFormValues) => {
            const task: BoardColumnTask = {
                id: uuidv4(),
                description: formValues.description,
                name: formValues.name,
                subtasks: formValues.subtasks.map((subtask) => ({
                    ...subtask,
                    status: 'pending',
                })),
            }

            addTask({ boardId, columnId: formValues.status, task })

            navigate({ to: '/boards/$boardId', params: { boardId } })
        },
        [addTask, boardId, navigate]
    )

    return (
        <ControlledForm
            formContext={formContext}
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
        >
            <TaskDialogFormContent statusesOptions={statusesOptions} />
        </ControlledForm>
    )
}

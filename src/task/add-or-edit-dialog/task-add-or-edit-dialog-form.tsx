import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledForm } from '@/components/form/controlled-form'
import { TaskAddOrEditDialogFormContent } from './task-add-or-edit-dialog-form-content'
import { useTaskForm } from './use-task-form'
import { TaskAddOrEditDialogFormValues, taskAddOrEditDialogFormValuesSchema } from '../task-schemas'

type TaskAddOrEditDialogFormProps = {
    boardId: Board['id']
    columnId?: BoardColumn['id']
    isEditing: boolean
    taskId?: BoardColumnTask['id']
}

export const TaskAddOrEditDialogForm = ({
    boardId,
    columnId,
    isEditing,
    taskId,
}: TaskAddOrEditDialogFormProps) => {
    const { defaultValues, onSubmit, statusesOptions } = useTaskForm({ boardId, columnId, taskId })

    const formContext = useForm<TaskAddOrEditDialogFormValues>({
        defaultValues,
        resolver: zodResolver(taskAddOrEditDialogFormValuesSchema),
    })

    return (
        <ControlledForm
            formContext={formContext}
            className="flex flex-col gap-6 overflow-hidden"
            onSubmit={onSubmit}
        >
            <TaskAddOrEditDialogFormContent
                isEditing={isEditing}
                statusesOptions={statusesOptions}
            />
        </ControlledForm>
    )
}

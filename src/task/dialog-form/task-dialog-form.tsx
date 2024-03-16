import { Board, BoardColumn, BoardColumnTask } from '@/boards/boards-schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledForm } from '@/components/form/controlled-form'
import { TaskDialogFormContent } from './task-dialog-form-content'
import { useTaskForm } from './use-task-form'
import { TaskDialogFormValues, taskDialogFormValuesSchema } from '../task-schemas'

type TaskDialogFormProps = {
    boardId: Board['id']
    columnId?: BoardColumn['id']
    isEditing: boolean
    taskId?: BoardColumnTask['id']
}

export const TaskDialogForm = ({ boardId, columnId, isEditing, taskId }: TaskDialogFormProps) => {
    const { defaultValues, onSubmit, statusesOptions } = useTaskForm({ boardId, columnId, taskId })

    const formContext = useForm<TaskDialogFormValues>({
        defaultValues,
        resolver: zodResolver(taskDialogFormValuesSchema),
    })

    return (
        <ControlledForm
            formContext={formContext}
            className="flex flex-col gap-6 overflow-hidden"
            onSubmit={onSubmit}
        >
            <TaskDialogFormContent isEditing={isEditing} statusesOptions={statusesOptions} />
        </ControlledForm>
    )
}

import { ControlledInput } from '@/components/form/controlled-input'
import { ControlledTextarea } from '@/components/form/controlled-textarea'
import { getFieldKey } from '@/lib/get-field-key'
import { Button } from '@/components/ui/button'
import { BoardColumnTaskSubtask } from '@/boards/boards-schemas'
import { ControlledSelect } from '@/components/form/controlled-select'
import { DialogContentInner } from '@/components/ui/dialog'
import { TaskAddOrEditDialogFormValues } from '../task-schemas'
import { TaskAddOrEditDialogFormContentSubtasks } from './task-add-or-edit-dialog-form-content-subtasks'

type TaskAddOrEditDialogFormContentProps = {
    isEditing: boolean
    statusesOptions: Array<{
        label: BoardColumnTaskSubtask['name']
        value: BoardColumnTaskSubtask['id']
    }>
}

export const TaskAddOrEditDialogFormContent = ({
    isEditing,
    statusesOptions,
}: TaskAddOrEditDialogFormContentProps) => {
    return (
        <>
            <DialogContentInner className="gap-6">
                <ControlledInput
                    label="Title"
                    placeholder="e.g. Take coffee break"
                    name={getFieldKey<TaskAddOrEditDialogFormValues>('name')}
                />

                <ControlledTextarea
                    label="Description"
                    placeholder="e.g. Take coffee break"
                    name={getFieldKey<TaskAddOrEditDialogFormValues>('description')}
                />

                <TaskAddOrEditDialogFormContentSubtasks />

                <ControlledSelect
                    label="status"
                    options={statusesOptions}
                    name={getFieldKey<TaskAddOrEditDialogFormValues>('status')}
                />
            </DialogContentInner>

            <Button size="small" className="mx-6">
                {isEditing ? 'Save changes' : 'Create task'}
            </Button>
        </>
    )
}

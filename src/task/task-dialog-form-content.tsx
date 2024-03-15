import { ControlledInput } from '@/components/form/controlled-input'
import { ControlledTextarea } from '@/components/form/controlled-textarea'
import { getFieldKey } from '@/lib/get-field-key'
import { TaskDialogFormValues } from './task-schemas'
import { Button } from '@/components/ui/button'
import { BoardColumnTaskSubtask } from '@/boards/boards-schemas'
import { ControlledSelect } from '@/components/form/controlled-select'
import { TaskDialogFormContentSubtasks } from './task-dialog-form-content-subtasks'
import { DialogContentInner } from '@/components/ui/dialog'

type TaskDialogFormContentProps = {
    statusesOptions: Array<{
        label: BoardColumnTaskSubtask['name']
        value: BoardColumnTaskSubtask['id']
    }>
}

export const TaskDialogFormContent = ({ statusesOptions }: TaskDialogFormContentProps) => {
    return (
        <>
            <DialogContentInner className="gap-6">
                <ControlledInput
                    label="Title"
                    placeholder="e.g. Take coffee break"
                    name={getFieldKey<TaskDialogFormValues>('name')}
                />

                <ControlledTextarea
                    label="Description"
                    placeholder="e.g. Take coffee break"
                    name={getFieldKey<TaskDialogFormValues>('description')}
                />

                <TaskDialogFormContentSubtasks />

                <ControlledSelect
                    label="status"
                    options={statusesOptions}
                    name={getFieldKey<TaskDialogFormValues>('status')}
                />
            </DialogContentInner>

            <Button size="small" className="mx-6">
                Create Task
            </Button>
        </>
    )
}

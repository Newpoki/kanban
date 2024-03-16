import { ControlledInput } from '@/components/form/controlled-input'
import { getFieldKey } from '@/lib/get-field-key'
import { Button } from '@/components/ui/button'
import { DialogContentInner } from '@/components/ui/dialog'
import { BoardAddOrEditDialogFormValues } from '../board-schemas'
import { BoardAddOrEditDialogFormContentColumns } from './board-add-or-edit-dialog-form-content-columns'

type BoardAddOrEditDialogFormContentProps = {
    isEditing: boolean
}

export const BoardAddOrEditDialogFormContent = ({
    isEditing,
}: BoardAddOrEditDialogFormContentProps) => {
    return (
        <>
            <DialogContentInner className="gap-6">
                <ControlledInput
                    label="Title"
                    placeholder="e.g. Take coffee break"
                    name={getFieldKey<BoardAddOrEditDialogFormValues>('name')}
                />

                <BoardAddOrEditDialogFormContentColumns />
            </DialogContentInner>

            <Button size="small" className="mx-6">
                {isEditing ? 'Save changes' : 'Create new board'}
            </Button>
        </>
    )
}

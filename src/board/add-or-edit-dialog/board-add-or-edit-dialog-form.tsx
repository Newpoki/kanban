import { Board } from '@/boards/boards-schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledForm } from '@/components/form/controlled-form'
import {
    BoardAddOrEditDialogFormValues,
    boardAddOrEditDialogFormValuesSchema,
} from '../board-schemas'
import { useBoardForm } from './use-board-form'
import { BoardAddOrEditDialogFormContent } from './board-add-or-edit-dialog-form-content'

type BoardAddOrEditDialogFormProps = {
    board: Board | undefined
    isEditing: boolean
    onSuccess: (boardId: Board['id']) => void
}

export const BoardAddOrEditDialogForm = ({
    board,
    isEditing,
    onSuccess,
}: BoardAddOrEditDialogFormProps) => {
    const { defaultValues, onSubmit } = useBoardForm({ board, onSuccess })

    const formContext = useForm<BoardAddOrEditDialogFormValues>({
        defaultValues,
        resolver: zodResolver(boardAddOrEditDialogFormValuesSchema),
    })

    return (
        <ControlledForm
            formContext={formContext}
            className="flex flex-col gap-6 overflow-hidden"
            onSubmit={onSubmit}
        >
            <BoardAddOrEditDialogFormContent isEditing={isEditing} />
        </ControlledForm>
    )
}

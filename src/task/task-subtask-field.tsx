import { Input, InputProps } from '@/components/ui/input'
import { Close } from '@/icons'

type TaskSubtaskFieldProps = InputProps

export const TaskSubtaskField = ({ ...others }: TaskSubtaskFieldProps) => {
    return (
        <div className="flex items-center gap-4">
            <Input {...others} />
            <Close className="h-4 w-4" />
        </div>
    )
}

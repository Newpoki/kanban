import { FieldPath, FieldValues, useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Textarea, TextareaProps } from '../ui/textarea'

type ControlledTextareaProps<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>
    label?: string
    placeholder?: TextareaProps['placeholder']
}

export function ControlledTextarea<TFieldValues extends FieldValues>({
    name,
    label,
    placeholder,
}: ControlledTextareaProps<TFieldValues>) {
    const { control } = useFormContext<TFieldValues>()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Textarea
                            {...field}
                            placeholder={placeholder}
                            error={fieldState.error?.message}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

import { FieldPath, FieldValues, useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input, InputProps } from '../ui/input'

export type ControlledInputProps<TFieldValues extends FieldValues> =
    React.InputHTMLAttributes<HTMLInputElement> & {
        name: FieldPath<TFieldValues>
        label?: string
        placeholder?: InputProps['placeholder']
    }

export function ControlledInput<TFieldValues extends FieldValues>({
    className,
    name,
    label,
    placeholder,
}: ControlledInputProps<TFieldValues>) {
    const { control } = useFormContext<TFieldValues>()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                return (
                    <FormItem className="w-full">
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <Input
                                {...field}
                                value={field.value ?? ''}
                                className={className}
                                placeholder={placeholder}
                                error={fieldState.error?.message}
                            />
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}

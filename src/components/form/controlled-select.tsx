import { FieldPath, FieldValues, useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type DefaultOption = {
    value: string
    label: string
}

export type ControlledSelectProps<
    TFieldValues extends FieldValues,
    TOption extends DefaultOption,
> = React.SelectHTMLAttributes<HTMLSelectElement> & {
    name: FieldPath<TFieldValues>
    label?: string
    options: Array<TOption>
    getOptionLabel?: (option: TOption) => string
    getOptionValue?: (option: TOption) => string
}

export function ControlledSelect<TFieldValues extends FieldValues, TOption extends DefaultOption>({
    className,
    name,
    label,
    options,
    getOptionLabel = (option: TOption) => option.label,
    getOptionValue = (option: TOption) => option.value,
}: ControlledSelectProps<TFieldValues, TOption>) {
    const { control } = useFormContext<TFieldValues>()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { ref, onChange, ...othersField } }) => (
                <FormItem className="w-full">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Select {...othersField} onValueChange={onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent className={className} ref={ref}>
                                {options.map((option) => {
                                    const optionValue = getOptionValue(option)
                                    const optionLabel = getOptionLabel(option)

                                    return (
                                        <SelectItem key={optionValue} value={optionValue}>
                                            {optionLabel}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

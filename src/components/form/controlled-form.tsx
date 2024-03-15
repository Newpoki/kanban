import { forwardRef, useCallback } from 'react'
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

type UsableFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'className' | 'onSubmit'>

export type ControlledFormProps<T extends FieldValues = FieldValues> = {
    children?: React.ReactNode
    className?: string
    onSubmit: SubmitHandler<T>
    formProps?: UsableFormProps
    formContext: UseFormReturn<T>
}

/**
 * Internal component is created here because TOption generic parameter can't be defined with forwardRef directly.
 * See https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref for more details
 */
const ControlledFormInternal = <T extends FieldValues = FieldValues>(
    { className, formContext, onSubmit, children, formProps }: ControlledFormProps<T>,
    ref: React.ForwardedRef<HTMLFormElement>
) => {
    const handleSubmit = useCallback(
        (event: React.FormEvent | undefined) => formContext.handleSubmit(onSubmit)(event),
        [formContext, onSubmit]
    )

    return (
        <FormProvider {...formContext}>
            <form noValidate {...formProps} className={className} onSubmit={handleSubmit} ref={ref}>
                {children}
            </form>
        </FormProvider>
    )
}

export const ControlledForm: <T extends FieldValues = FieldValues>(
    p: ControlledFormProps<T> & { ref?: React.Ref<HTMLFormElement> }
) => React.ReactElement = forwardRef(ControlledFormInternal) as <
    T extends FieldValues = FieldValues,
>(
    p: ControlledFormProps<T> & { ref?: React.Ref<HTMLFormElement> }
) => React.ReactElement

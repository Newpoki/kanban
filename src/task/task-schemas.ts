import { z } from 'zod'

export const taskDialogFormValuesSubtaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Can't be empty" }),
})

export const taskDialogFormValuesSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Can't be empty" }),
    description: z.string(),
    subtasks: z.array(taskDialogFormValuesSubtaskSchema),
    status: z.string(),
})

export type TaskDialogFormValues = z.infer<typeof taskDialogFormValuesSchema>

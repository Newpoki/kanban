import { z } from 'zod'

export const taskAddOrEditDialogFormValuesSubtaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Can't be empty" }),
})

export const taskAddOrEditDialogFormValuesSchema = z.object({
    id: z.string().optional(),
    name: z.string().trim().min(1, { message: "Can't be empty" }),
    description: z.string().trim(),
    subtasks: z.array(taskAddOrEditDialogFormValuesSubtaskSchema),
    status: z.string(),
})

export type TaskAddOrEditDialogFormValues = z.infer<typeof taskAddOrEditDialogFormValuesSchema>

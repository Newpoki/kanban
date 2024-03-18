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

export const taskAddOreditDialogFormContentSubtaskDraggableDataSchema = z.object({
    subtaskIndex: z.number(),
    sortable: z.object({
        containerId: z.string(),
        index: z.number(),
        // Should have a better schema, but there is no need ATM
        items: z.array(z.object({})),
    }),
})

export type TaskAddOrEditDialogFormValues = z.infer<typeof taskAddOrEditDialogFormValuesSchema>

export type TaskAddOrEditDialogFormContentSubtaskDraggableData = z.infer<
    typeof taskAddOreditDialogFormContentSubtaskDraggableDataSchema
>

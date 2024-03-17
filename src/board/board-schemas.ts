import { z } from 'zod'

export const boardColumnTaskDraggableDataSchema = z.object({
    taskId: z.string(),
    sortable: z.object({
        containerId: z.string(),
        index: z.number(),
        // Should have a better schema, but there is no need ATM
        items: z.array(z.object({})),
    }),
})

export const boardColumnDroppableDataSchema = z.object({
    taskId: z.string(),
    sortable: z.object({
        containerId: z.string(),
        index: z.number(),
        // Should have a better schema, but there is no need ATM
        items: z.array(z.object({})),
    }),
})

export const boardAddOrEditDialogFormValuesColumnSchema = z.object({
    color: z.string().min(1, { message: "Can't be empty" }),
    id: z.string(),
    name: z.string().min(1, { message: "Can't be empty" }),
})

export const boardAddOrEditDialogFormValuesSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, { message: "Can't be empty" }),
    columns: z.array(boardAddOrEditDialogFormValuesColumnSchema),
})

export type BoardColumnTaskDraggableData = z.infer<typeof boardColumnTaskDraggableDataSchema>
export type BoardColumnDroppableData = z.infer<typeof boardColumnDroppableDataSchema>
export type BoardAddOrEditDialogFormValues = z.infer<typeof boardAddOrEditDialogFormValuesSchema>

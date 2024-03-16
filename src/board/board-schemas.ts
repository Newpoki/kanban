import { z } from 'zod'

export const boardColumnTaskDraggableDataSchema = z.object({
    taskId: z.string(),
    columnId: z.string(),
})

export const boardColumnDroppableDataSchema = z.object({
    columnId: z.string(),
})

export type BoardColumnTaskDraggableData = z.infer<typeof boardColumnTaskDraggableDataSchema>
export type BoardColumnDroppableData = z.infer<typeof boardColumnDroppableDataSchema>

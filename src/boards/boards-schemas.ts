import { z } from 'zod'

const boardColumnTaskSubtaskSchema = z.object({
    id: z.string(),
    name: z.string(),
    status: z.enum(['pending', 'done']),
})

const boardColumnTasksSchema = z.object({
    id: z.string(),
    name: z.string(),
    subtasks: z.array(boardColumnTaskSubtaskSchema),
})

const boardColumnSchema = z.object({
    color: z.string(),
    id: z.string(),
    name: z.string(),
    tasks: z.array(boardColumnTasksSchema),
})

const boardSchema = z.object({
    id: z.string(),
    name: z.string(),
    columns: z.array(boardColumnSchema),
})

export const boardsMapSchema = z.record(boardSchema.shape.id, boardSchema)

export type Board = z.infer<typeof boardSchema>
export type BoardsMap = z.infer<typeof boardsMapSchema>

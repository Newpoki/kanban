export function insertAtIndex<TData>(array: Array<TData>, index: number, item: TData) {
    return [...array.slice(0, index), item, ...array.slice(index)]
}

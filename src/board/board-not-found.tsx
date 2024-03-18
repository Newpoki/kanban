export const BoardNotFound = () => {
    return (
        <div className="board-border-color flex flex-1 flex-col items-center justify-center gap-2 border-t-[1px] bg-grey-100 dark:bg-grey-900 dark:text-white">
            <h1 className="text-h-xl">Board not found</h1>
            <p className="mb-4 text-h-m">We didn't find the board you are looking for</p>
        </div>
    )
}

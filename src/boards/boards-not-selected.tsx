export const BoardsNotSelected = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-grey-100 px-6 text-center dark:bg-grey-900 dark:text-white">
            <h1 className="text-h-xl">No board selected</h1>
            <p className="mb-4 text-h-m">Select a board to start planning your success</p>
        </div>
    )
}

import { FAKE_DATA } from '@/fake-data'
import { BoardsListItem } from './boards-list-item'

export const BoardsList = () => {
    return (
        <>
            <h2 className="pb-5 pl-6 pt-4 text-h-s uppercase text-grey-500">
                All boards ({FAKE_DATA.length})
            </h2>

            <div className="pr-6">
                {FAKE_DATA.map((board, index) => {
                    // TODO: check url to know if displayed board
                    const isSelected = index === 0

                    return (
                        <BoardsListItem
                            key={board.id}
                            board={board}
                            variant={isSelected ? 'selected' : undefined}
                        />
                    )
                })}
            </div>

            <BoardsListItem variant="new" />
        </>
    )
}

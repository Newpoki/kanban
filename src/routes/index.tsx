import { useBoardsStore } from '@/boards/boards-store'
import { Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: HomeComponent,
})

function HomeComponent() {
    const firstBoard = useBoardsStore((store) => Object.values(store.data)[0])

    if (firstBoard == null) {
        // TODO: Add error screen for no board found
        return <div>error</div>
    }

    return <Navigate to="/boards/$boardId" params={{ boardId: firstBoard.id }} />
}

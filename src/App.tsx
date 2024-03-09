import { Board } from './board/board'
import { BoardsDrawer } from './boards/boards-drawer'
import { ThemeProvider } from './theme/theme-provider'

const App = () => {
    return (
        <ThemeProvider>
            <div className="flex min-h-[100dvh]">
                <BoardsDrawer />
                <Board />
            </div>
        </ThemeProvider>
    )
}

export default App

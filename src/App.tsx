import { Board } from './board/board'
import { ThemeProvider } from './theme/theme-provider'

const App = () => {
    return (
        <ThemeProvider>
            <div className="flex min-h-[100dvh] flex-col">
                <Board />
            </div>
        </ThemeProvider>
    )
}

export default App

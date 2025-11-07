import { useState } from 'react'
import './App.css'

const App = () => {
    const [tasks, setTasks] = useState<string[]>([])
    const [input, setInput] = useState('')

    const addTask = () => {
        if (!input.trim()) return
        setTasks((prev) => [...prev, input.trim()])
        setInput('')
    }

    return (
        <div className="app-shell">
            <div className="app-card">
                <header className="app-header">
                    <h1>Task Tracker</h1>
                    <p>Capture what you need to do today</p>
                </header>

                <div className="input-row">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        data-cy="task-input"
                    />
                    <button onClick={addTask} data-cy="add-btn">
                        Add
                    </button>
                </div>

                <ul className="task-list">
                    {tasks.length === 0 && (
                        <li className="task-empty">No tasks yet — add your first one 👇</li>
                    )}
                    {tasks.map((t, i) => (
                        <li key={i} className="task-item" data-cy="task-item">
                            {t}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default App

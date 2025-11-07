import { useState, useEffect } from 'react';
import './App.css';

type Task = {
  id: number;
  title: string;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // pretend API for practice Cypress test
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data);
      })
      .catch(() => {
        // in real life: show error state
      })
      .finally(() => setLoading(false));
  }, []);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), title: input.trim() }]);
    setInput('');
  };

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

        {loading ? (
          <p className="task-empty" data-cy="loading">
            Loading tasks…
          </p>
        ) : (
          <ul className="task-list">
            {tasks.length === 0 && (
              <li className="task-empty" data-cy="empty-state">
                No tasks yet — add your first one 👇
              </li>
            )}
            {tasks.map((t) => (
              <li key={t.id} className="task-item" data-cy="task-item">
                {t.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;

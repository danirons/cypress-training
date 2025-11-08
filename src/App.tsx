import { useEffect, useRef, useState } from 'react';
import './App.css';

type Task = {
  id: number;
  title: string;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // guard against StrictMode double-effect
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const MIN_LOADING_MS = 300;
    const start = performance.now();

    fetch('/api/tasks')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Task[]) => {
        setTasks(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        const elapsed = performance.now() - start;
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
        setTimeout(() => setLoading(false), remaining);
      });
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

        {loading && (
          <p className="task-empty" data-cy="loading">
            Loading tasks…
          </p>
        )}

        {error && !loading && (
          <p className="task-empty" data-cy="error">
            Something went wrong. Please try again later.
          </p>
        )}

        {!loading && !error && (
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

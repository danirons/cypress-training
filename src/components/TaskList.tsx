export type Task = {
  id: number;
  title: string;
};

type TaskListProps = {
  tasks: Task[];
  loading?: boolean;
  error?: boolean;
};

const TaskList = ({ tasks, loading, error }: TaskListProps) => {
  if (loading) return <p data-cy="loading">Loading tasks...</p>;
  if (error) return <p data-cy="error">Something went wrong</p>;

  if (tasks.length === 0) {
    return (
      <p className="task-empty" data-cy="empty-state">
        No tasks yet
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <li key={t.id} className="task-item" data-cy="task-item">
          {t.title}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

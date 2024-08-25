import "./Todo.css";

interface Task {
  id: number;
  task: string;
  completed: boolean;
  lastUpdated: string;
}

interface TodoItemProps {
  item: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  className: string;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onDelete,
  onToggle,
  index,
  className,
}) => {
  return (
    <li className={className} title={`Task added: ${item.lastUpdated}`}>
      <p className={item.completed ? "completed" : ""}>
        {index + 1}. {item.task}
      </p>
      <input
        type="checkbox"
        className="custom-checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
      />
      <button className="same-size" onClick={() => onDelete(item.id)}>
        X
      </button>
    </li>
  );
};

export default TodoItem;

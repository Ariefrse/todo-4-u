import PropTypes from "prop-types";
import "./TodoItem.css";

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


  const TodoItem: React.FC<TodoItemProps> = ({ item, onDelete, onToggle, index, className }) => {
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
        <button className="delete-btn" onClick={() => onDelete(item.id)}>X</button>
       
      </li>
    );
  };
TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,  
    completed: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  
};

export default TodoItem;
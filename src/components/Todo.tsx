import { useEffect, useState } from "react";
import "./Todo.css";
import TodoItem from "./TodoItem";

interface Task {
  id: number;
  task: string;
  completed: boolean;
  lastUpdated: string;
}

const Todo = () => {
  const [task, setTask] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todo") || "[]");
    if (stored) {
      const updatedStored = stored.map((item: Task) => ({
        ...item,
        lastUpdated: item.lastUpdated || new Date().toLocaleString(),
      }));
      setTask(updatedStored);
    }
  }, []);

  const updateLocalStorage = (updatedTasks: Task[]) => {
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
    setTask(updatedTasks);
  };

  const addTodo = () => {
    if (todo.trim() !== "") {
      const newTask = {
        id: Date.now(),
        task: todo,
        completed: false,
        lastUpdated: new Date().toLocaleString(),
      };
      const updatedTasks = [...task, newTask];
      updateLocalStorage(updatedTasks);
      setTodo("");
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTasks = task.filter((item) => item.id !== id);
    updateLocalStorage(updatedTasks);
  };

  const toggleTodo = (id: number) => {
    const updatedTasks = task.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed,
            lastUpdated: new Date().toLocaleString(),
          }
        : item,
    );
    updateLocalStorage(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div className="add-todo">
        <input
          type="text"
          className="input-todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add new list here"
        />
        <button className="todo-btn" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <div className="todo-list">
        <ul>
          {task.map((item, index) => (
            <TodoItem
              key={item.id}
              item={item}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              className="todo-item"
              index={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;

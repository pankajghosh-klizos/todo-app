// TodoList.jsx - Displays the list of todos
import "./TodoList.css";
import { useTodo } from "../../contexts";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useState } from "react";

const TodoList = () => {
  const { todos, updateTodo, toggleComplete, deleteTodo } = useTodo();
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  if (todos.length === 0) {
    return <p>No todos</p>;
  }

  const handleEdit = (id, todo) => {
    setEditableTodoId(id);
    setEditText(todo);
  };

  const handleSave = (id) => {
    updateTodo(id, { todo: editText });
    setEditableTodoId(null);
    setEditText("");
  };

  return (
    <ul className="todo-list">
      {todos.map(({ id, todo, completed }) => (
        <li key={id} className="todo-item">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleComplete(id)}
            aria-label={`Mark ${todo} as completed`}
          />

          {editableTodoId === id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edited-field"
            />
          ) : (
            <span className={`todo-text ${completed ? "completed" : ""}`}>
              {todo}
            </span>
          )}

          <div className="btn-grp">
            {editableTodoId === id ? (
              <button aria-label="Save todo" onClick={() => handleSave(id)}>
                Save
              </button>
            ) : (
              <button
                aria-label="Edit todo"
                onClick={() => handleEdit(id, todo)}
              >
                <FaPenToSquare />
              </button>
            )}
            <button aria-label="Delete todo" onClick={() => deleteTodo(id)}>
              <FaTrashCan />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

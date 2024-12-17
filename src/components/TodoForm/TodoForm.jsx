// TodoForm.jsx - Add todos in list
import { useForm } from "react-hook-form";
import { useTodo } from "../../contexts/TodoContext";
import "./TodoForm.css";

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();
  const { addTodo } = useTodo();

  const onSubmit = (data) => {
    addTodo({ id: Date.now(), todo: data.todo, completed: false });
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="input-field"
        {...register("todo", { required: true })}
        aria-label="Todo item"
        placeholder="Enter a new todo"
      />
      <button type="submit" disabled={!isDirty}>
        Add
      </button>
      <button type="button" onClick={() => reset()} aria-label="Clear form">
        Clear
      </button>
    </form>
  );
};

export default TodoForm;

import React, { useState } from "react";

// i want a type alias for my Todo that has an id (number), a task(string), completed (boolean)

// our Todo type alias
type Todo = {
  id: number;
  task: string;
  completed: boolean;
  dueDate?: string, //optional property
};

// declaring our component as a React.FC (React Functional Component)
const TodoList: React.FC = () => {
  // setting our todos state to be an array of Todo objects (Todo[])
  const [todos, setTodos] = useState<Todo[]>([]);
  // without <string>, because we are setting our initial state to be an empty string, typescript will infer that newTask is of type string.
  // being explicit and including <string> doesn't hurt
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = (event: any): void => {
    event.preventDefault()
    const newTodo: Todo = {
        id: Date.now(),
        task: newTask,
        completed: false
    }
    setTodos([...todos, newTodo])

  }

  const toggleCompleted = (id: number) => {
    // create copy of our todos array that we are able to modify safely
    let prevTodos: Todo[] = [...todos];
    const selectedTodo: Todo = prevTodos.find((todo) => todo.id === id)

    selectedTodo.completed = !selectedTodo.completed;

    setTodos(prevTodos);
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <h2>Your TodoList:</h2>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} 
            onChange={() => toggleCompleted(todo.id)}
            />
            <span style={{
                textDecoration: todo.completed ? "line-through" : "none"
            }}>{todo.task}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
      <h4>Add your todos:</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" autoComplete="off" onChange={(event) => setNewTask(event.target.value)}/>
        <button type="submit">Add To List</button>
      </form>
    </div>
  );
};

export default TodoList;

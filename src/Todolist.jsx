import { useEffect, useRef, useState } from "react";

function Todolist() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false); // State to track empty input error
  const [removeT, setRemoveT] = useState(false);
  const [limit, setLimit] = useState(0);
  const todoText = useRef();

  useEffect(() => {
    const existingTodos = localStorage.getItem("todos");
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  }, []);

  function addTodo(event) {
    event.preventDefault();
    const todoValue = todoText.current.value.trim(); // Trim whitespace
    const next = [...todos, todoValue];
    if (next.length > 8) {
      alert(
        "You have reached the maximum limit of 8 todos. Please delete some todos before adding more."
      );
      setRemoveT(true);
      return;
    }
    if (todoValue) {
      setTodos(next);
      localStorage.setItem("todos", JSON.stringify(next));
      todoText.current.value = ""; // Clear input field after adding todo
      setError(false); // Reset error state
      setLimit(next.length);
      console.log(limit);
    } else {
      setError(true); // Set error state if input is empty
    }
  }

  function removeTodo(indexToRemove) {
    const updatedTodos = todos.filter((_, index) => index !== indexToRemove);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-screen">
      <div className="max-w-md w-full space-y-8 rounded-lg p-10 bg-gray-200 ring-inset">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Todo List 📋
          </h2>
        </div>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">
              {" "}
              Please enter a task before adding!
            </span>
          </div>
        )}
        {removeT && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">
              {" "}
              Please remove a task to add!
            </span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={addTodo}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="text"
              placeholder="What needs to be done?"
              ref={todoText}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Todo ✅
            </button>
          </div>
        </form>
        <ul className="mt-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="bg-white shadow-sm rounded-md p-4 mb-2 flex justify-between items-center"
            >
              <span>{todo}</span>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeTodo(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todolist;

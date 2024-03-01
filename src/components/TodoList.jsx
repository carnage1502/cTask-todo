import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import saveToLocal from "../storage/saveToLocal.js";

const TodoList = () => {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState(saveToLocal());
  const [editIndex, setEditIndex] = useState(-1);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleAddBtn = () => {
    if (inputVal.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputVal,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputVal("");
    }
  };

  const handleToggleCheckbox = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // Toggle the completed status
        const updatedTodo = { ...todo, completed: !todo.completed };
        // Save the updated todo in local storage
        saveToLocal([...todos.filter((t) => t.id !== id), updatedTodo]);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const filterTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodos);
  };

  const handleEditIndex = (index) => {
    setInputVal(todos[index].text);
    setEditIndex(index);
  };

  const handleEditBtn = () => {
    if (inputVal.trim() !== "") {
      const editTodos = [...todos];
      editTodos[editIndex].text = inputVal;
      setTodos(editTodos);
      setInputVal("");
    }
  };

  return (
    <>
      {/* TodoInput */}
      <div className="p-6 rounded shadow-md w-full max-w-lg lg:w-2/3 bg-[#2b1c48]">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          cTASK!
        </h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a todo..."
            className="py-2 px-4 border rounded w-full focus:outline-none mr-2"
            value={inputVal}
            onChange={handleInputChange}
          />
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded"
            onClick={editIndex === -1 ? handleAddBtn : handleEditBtn}
          >
            {editIndex === -1 ? <FaPlus /> : <FaEdit />}
          </button>
        </div>
        <div className="flex text-white items-center mt-3 space-x-1">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
          />
          <h2>Show Finished</h2>
        </div>
      </div>

      {/* TodoList */}
      {todos.length > 0 && (
        <div className="bg-[#2b1c48] text-white p-6 rounded shadow-md w-full max-w-lg lg:w-2/3">
          <ul>
            {todos.map((todo, index) => {
              return (
                (showFinished || !todo.completed) && (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-[#5a3990] p-3 rounded shadow-md mb-3"
                  >
                    <div className="space-x-2">
                      <input
                        type="checkbox"
                        onChange={() => handleToggleCheckbox(todo.id)}
                        checked={todo.completed}
                      />
                      <span
                        className={`text-lg ${
                          todo.completed
                            ? "line-through decoration-zinc-900 decoration-4"
                            : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <div className="flex h-full">
                      <button
                        className="mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-700"
                        onClick={() => handleEditIndex(index)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-500 hover:to-red-700"
                        onClick={() => handleDelete(todo.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default TodoList;

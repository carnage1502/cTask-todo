import "./styles/App.css";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-[#b6a7ff]">
      <TodoList />
    </div>
  );
};

export default App;

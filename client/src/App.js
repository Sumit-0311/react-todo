import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillEdit } from "react-icons/ai";
const api_base = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [update, setUpdate] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [newText, setNewText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [updateHead, setUpdateHead] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(api_base + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(api_base + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const addTodo = async () => {
    const data = await fetch(api_base + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        head: newTodo,
        text: newText,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
    setNewText("");
  };

  const deleteTodo = async (id) => {
    const data = await fetch(api_base + "/todo/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error: ", err));
    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  const updateTodo = async (id) => {
    console.log(updateHead);
    console.log(updateText);
    const data = await fetch(api_base + "/todo/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        head: updateHead,
        text: updateText,
      }),
    })
      .then((res) => res.json())
      .then((res) => window.location.reload(false))
      .catch((err) => console.error("Error: ", err));

    setUpdate(false);
    setUpdateHead("");
    setUpdateText("");
  };

  return (
    <div className="container">
      <div className="App">
        <h1>To Do List</h1>
        <h4>Your tasks</h4>

        <div className="todos">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                className={"todo" + (todo.complete ? " is-complete" : "")}
                key={todo._id}
              >
                <div
                  className="checkbox"
                  onClick={() => completeTodo(todo._id)}
                />

                <div className="title">
                  {todo.head}

                  <br />
                  <div className="text">{todo.text}</div>
                </div>

                <div className="edit" onClick={() => setUpdate(true)}>
                  <AiFillEdit />
                </div>

                {update ? (
                  <div className="popup">
                    <div
                      className="closePopup"
                      onClick={() => setUpdate(false)}
                    >
                      X
                    </div>
                    <div className="content">
                      <h3>Update Task</h3>
                      <input
                        type="text"
                        placeholder="Title"
                        className="add-todo-input"
                        onChange={(e) => setUpdateHead(e.target.value)}
                        value={updateHead}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        className="add-todo-input"
                        onChange={(e) => setUpdateText(e.target.value)}
                        value={updateText}
                      />
                      <div
                        className="button"
                        onClick={() => updateTodo(todo._id)}
                      >
                        Update Task
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className="delete-todo"
                  onClick={() => deleteTodo(todo._id)}
                >
                  x
                </div>
              </div>
            ))
          ) : (
            <p>You currently have no tasks</p>
          )}
        </div>

        <div className="addPopup" onClick={() => setPopupActive(true)}>
          +
        </div>

        {popupActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setPopupActive(false)}>
              X
            </div>
            <div className="content">
              <h3>Add Task</h3>
              <input
                type="text"
                placeholder="Title"
                className="add-todo-input"
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <input
                type="text"
                placeholder="Description"
                className="add-todo-input"
                onChange={(e) => setNewText(e.target.value)}
                value={newText}
              />
              <div className="button" onClick={addTodo}>
                Create Task
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;

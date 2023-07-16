import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [itemText, setItemText] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>ToDo Application</h1>
      </header>
      <div className="container">
        <form className="container_input" onSubmit={(e) => addItem(e)}>
          <input
            type="text"
            placeholder="Add a Todo Item"
            onChange={(e) => setItemText(e.target.value)}
            value={itemText}
          />
          <button type="submit">ADD +</button>
        </form>
      </div>
      <div className="container_todoItems">
        <div className="todo-item">
          <p className="item-content">This is a todo item</p>
          <button className="btn update-btn">Update</button>
          <button className="btn delete-btn">Delete</button>
        </div>
        <div className="todo-item">
          <p className="item-content">This is a todo item</p>
          <button className="btn update-btn">Update</button>
          <button className="btn delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default App;

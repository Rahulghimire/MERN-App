import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>ToDo Application</h1>
      </header>
      <div className="container">
        <form className="container_input">
          <input type="text" placeholder="Add a Todo Item" />
          <button type="submit">+</button>
        </form>
      </div>
      <div className="container_todoItems">
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

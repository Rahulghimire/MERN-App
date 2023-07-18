import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });
      console.log(res);
      setItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("useeffect runnign");
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        console.log(res.data);
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      console.log(res.data);
      const newItems = items.filter((item) => item._id !== id);
      setItems(newItems);
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
        {items.map((item) => {
          return (
            <div className="todo-item" key={item._id}>
              <p className="item-content">{item.item}</p>
              <button className="btn update-btn">Update</button>
              <button
                className="btn delete-btn"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

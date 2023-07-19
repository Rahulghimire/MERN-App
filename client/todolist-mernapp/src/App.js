import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

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

  //delete the item
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

  //update the item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = items.findIndex(
        (item) => item._id === isUpdating
      );
      console.log(updatedItemIndex);
      const updatedItem = (items[updatedItemIndex].item = updateItemText);
    } catch (err) {
      console.log(err);
    }
    setUpdateItemText("");
    setIsUpdating("");
  };

  //update form
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => updateItem(e)}>
      <input
        type="text"
        className="update-new-input"
        placeholder="New Item"
        onChange={(e) => setUpdateItemText(e.target.value)}
        value={updateItemText}
      />
      <button type="submit" className="btn update-btn">
        Update
      </button>
    </form>
  );

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
              {isUpdating === item._id ? (
                renderUpdateForm()
              ) : (
                <>
                  <p className="item-content">{item.item}</p>
                  <button
                    className="btn update-btn"
                    onClick={() => {
                      setIsUpdating(item._id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

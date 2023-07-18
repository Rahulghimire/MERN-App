const router = require("express").Router();

//import todo Model
const todoItemsModel = require("../models/todoItems");

//create first route to post data into the database
router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
    });
    //save the item in the database
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//create second route to get data from the database
router.get("/api/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

//Update the item
router.put("/api/item/:id", async (req, res) => {
  try {
    //find item by id and update it
    let updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Item updated successfully");
  } catch (err) {
    res.json(err);
  }
});

//Delete item from a database
router.delete("/api/item/:id", async (req, res) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item deleted successfully");
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

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
    res.status(200).json("Item Added Successfully");
  } catch (err) {
    res.json(err);
  }
});

//create second route to get data from the database
router.get("/api/items", async (req, res) => {
  try {

  } catch (err) {
    
  }
});

module.exports = router;

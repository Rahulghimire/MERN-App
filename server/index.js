const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

//use express.json to get data in json format
app.use(express.json());

const PORT = process.env.PORT || 5500;

//Connect to the mongodb
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//Import the routes
const TodoItemRoute = require("./routes/todoItems");

app.use("/", TodoItemRoute);

//Add PORT and connect to the server
app.listen(PORT, () => console.log("Server connected"));

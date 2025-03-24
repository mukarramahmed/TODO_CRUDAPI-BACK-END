import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todomodel.js";
dotenv.config();
const app = express();
const port = process.env.port || 6000;

//middleware
app.use(express.json());

connectToDB();

//TODO APIS
app.get("/todos", async (req, res) => {
  try {
    const result = await Todo.find();
    res.send({
      success: true,
      message: "Todo Retrived Successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed To Retrived Todo Lists",
      data: result,
    });
  }
});

app.post("/create-todo", async (req, res) => {
  const todoDetails = req.body;
  try {
    const result = await Todo.create(todoDetails);
    res.send({
      success: true,
      message: "Todo is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Failed to create Todo",
      data: result,
    });
  }
});

//Dynamic route

app.get("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const result = await Todo.findById(todoId);
    res.send({
      success: true,
      message: "Todo is Retrived Successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to Retrived Todo",
      data: result,
    });
  }
});

app.patch("/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  const updatedTodo = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    });
    res.send({
      success: true,
      message: "Todo is updated successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed To Update the Todo",
      data: result,
    });
  }
});

app.delete("/delete/:todoId", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.todoId);
    res.send({
      success: true,
      message: "Todo is deleted successfully",
      data: null,
    });
  } catch (error) {
    res.send({
      success: true,
      message: "Failed to delete Todo",
      data: null,
    });
  }
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON  PORT ${port}`);
});

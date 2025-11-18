import express from "express";
import { TaskController } from "../controllers/TaskController";

const Task = express.Router();
const taskController = new TaskController();

// GET
// Task.get("/tasks", taskController.getAllTasks);
Task.get("/tasks", taskController.getAllTasksDetails);
Task.get("/tasks/:id", taskController.getTaskById);
Task.get("/projects/:id/tasks", taskController.getTasksByProjectId);

// POST
Task.post("/tasks", taskController.createTask);
Task.post("/tasks/:id/assign", taskController.assignTask);
Task.post("/tasks/:id/tags", taskController.addTags);

// PUT
Task.put("/tasks/:id", taskController.updateTask);
Task.put("/tasks/:id/status", taskController.updateTaskStatus);
Task.put("/tasks/:id/priority", taskController.updateTaskPriority);

// DELETE
Task.delete("/tasks/:id", taskController.deleteTask);
Task.delete("/tasks/:taskId/assign/:userId", taskController.unassignTask);
Task.delete("/tasks/:id/tags", taskController.removeTags);

export default Task;

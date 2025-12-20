import express from "express";
import { TaskController } from "../controllers/TaskController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const Task = express.Router();
const taskController = new TaskController();

// GET
// Task.get("/tasks", taskController.getAllTasks);
Task.get("/tasks", taskController.getAllTasksDetails);
Task.get("/tasks/:id", taskController.getTaskById);
Task.get("/projects/:id/tasks", AuthMiddleware.verifyAccessToken, taskController.getTasksByProjectId);

// POST
Task.post("/tasks", AuthMiddleware.verifyAccessToken, taskController.createTask);
Task.post("/tasks/:id/assign", taskController.assignTask);
Task.post("/tasks/:id/tags", taskController.addTags);

// PUT
Task.put("/tasks/:id", AuthMiddleware.verifyAccessToken, taskController.updateTask);
Task.put("/tasks/:id/status", AuthMiddleware.verifyAccessToken, taskController.updateTaskStatus);
Task.put("/tasks/:id/priority", taskController.updateTaskPriority);

// DELETE
Task.delete("/tasks/:id", AuthMiddleware.verifyAccessToken, taskController.deleteTask);
Task.delete("/tasks/:taskId/assign/:userId", taskController.unassignTask);
Task.delete("/tasks/:id/tags", taskController.removeTags);

export default Task;

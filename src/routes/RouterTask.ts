import  express from "express";
import { AddNewTask, assignTask, GetAllTask, GetTask, GetTasksByProjectId, UpdateTaskById, UpdateStatus, UpdatePriority, UpdateTags } from "../controllers/ControllersTask";

const Task = express.Router();

//GET
Task.get("/tasks",GetAllTask);
Task.get("/projects/:id/tasks",GetTasksByProjectId);
Task.get("/api/tasks/:id",GetTask);

//POST
Task.post("/tasks",AddNewTask)
Task.post("/tasks/:id/assign",assignTask)

//PUT
Task.put("tasks/:id",UpdateTaskById)
Task.put("tasks/:id/status",UpdateStatus)
Task.put("/tasks/:id/priority",UpdatePriority)
Task.put("/tasks/:id/tags",UpdateTags)


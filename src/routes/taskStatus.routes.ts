import express from 'express';
import { TaskStatusController } from '../controllers/TaskStatusController';

const TaskStatuses = express.Router();
const taskStatusController = new TaskStatusController();

// GET
TaskStatuses.get('/task/statuses', taskStatusController.getAllStatuses);

export default TaskStatuses;

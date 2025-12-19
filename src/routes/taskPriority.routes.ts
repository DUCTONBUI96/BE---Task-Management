import express from 'express';
import { TaskPriorityController } from '../controllers/TaskPriorityController';

const TaskPriorities = express.Router();
const taskPriorityController = new TaskPriorityController();

// GET
TaskPriorities.get('/task/priorities', taskPriorityController.getAllPriorities);

export default TaskPriorities;

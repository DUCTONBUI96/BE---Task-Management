import express from 'express';
import { TaskStatusController } from '~/controllers/TaskStatusController';

/**
 * @swagger
 * tags:
 *   name: TaskStatuses
 *   description: Task status management endpoints
 */
const TaskStatuses = express.Router();
const taskStatusController = new TaskStatusController();

// GET

/**
 * @swagger
 * /task/statuses:
 *   get:
 *     summary: Get all task statuses
 *     tags: [TaskStatuses]
 *     responses:
 *       200:
 *         description: List of all task statuses
 */
TaskStatuses.get('/task/statuses', taskStatusController.getAllStatuses);

export default TaskStatuses;

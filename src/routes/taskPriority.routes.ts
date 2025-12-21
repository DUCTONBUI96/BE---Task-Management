import express from 'express';
import { TaskPriorityController } from '../controllers/TaskPriorityController';

/**
 * @swagger
 * tags:
 *   name: TaskPriorities
 *   description: Task priority management endpoints
 */
const TaskPriorities = express.Router();
const taskPriorityController = new TaskPriorityController();

// GET

/**
 * @swagger
 * /task/priorities:
 *   get:
 *     summary: Get all task priorities
 *     tags: [TaskPriorities]
 *     responses:
 *       200:
 *         description: List of all task priorities
 */
TaskPriorities.get('/task/priorities', taskPriorityController.getAllPriorities);

export default TaskPriorities;

import express from "express";
import { TaskController } from "../controllers/TaskController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */
const Task = express.Router();
const taskController = new TaskController();

// GET

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks details
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks with details
 */
Task.get("/tasks", taskController.getAllTasksDetails);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
Task.get("/tasks/:id", taskController.getTaskById);

/**
 * @swagger
 * /projects/{id}/tasks:
 *   get:
 *     summary: Get tasks by project ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: List of tasks in the project
 *       401:
 *         description: Unauthorized
 */
Task.get("/projects/:id/tasks", AuthMiddleware.verifyAccessToken, taskController.getTasksByProjectId);

// POST

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               projectId:
 *                 type: string
 *               priorityId:
 *                 type: string
 *               statusId:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Task created
 *       401:
 *         description: Unauthorized
 */
Task.post("/tasks", AuthMiddleware.verifyAccessToken, taskController.createTask);

/**
 * @swagger
 * /tasks/{id}/assign:
 *   post:
 *     summary: Assign task to user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task assigned
 */
Task.post("/tasks/:id/assign", taskController.assignTask);

/**
 * @swagger
 * /tasks/{id}/tags:
 *   post:
 *     summary: Add tags to task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tags
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Tags added
 */
Task.post("/tasks/:id/tags", taskController.addTags);

// PUT

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               statusId:
 *                 type: string
 *               priorityId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 *       401:
 *         description: Unauthorized
 */
Task.put("/tasks/:id", AuthMiddleware.verifyAccessToken, taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}/status:
 *   put:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - statusId
 *             properties:
 *               statusId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task status updated
 *       401:
 *         description: Unauthorized
 */
Task.put("/tasks/:id/status", AuthMiddleware.verifyAccessToken, taskController.updateTaskStatus);

/**
 * @swagger
 * /tasks/{id}/priority:
 *   put:
 *     summary: Update task priority
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priorityId
 *             properties:
 *               priorityId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task priority updated
 */
Task.put("/tasks/:id/priority", taskController.updateTaskPriority);

// DELETE

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *       401:
 *         description: Unauthorized
 */
Task.delete("/tasks/:id", AuthMiddleware.verifyAccessToken, taskController.deleteTask);

/**
 * @swagger
 * /tasks/{taskId}/assign/{userId}:
 *   delete:
 *     summary: Unassign user from task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User unassigned
 */
Task.delete("/tasks/:taskId/assign/:userId", taskController.unassignTask);

/**
 * @swagger
 * /tasks/{id}/tags:
 *   delete:
 *     summary: Remove tags from task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tags
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Tags removed
 */
Task.delete("/tasks/:id/tags", taskController.removeTags);

export default Task;

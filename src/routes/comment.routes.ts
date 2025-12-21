import express from "express";
import { CommentController } from "../controllers/CommentController";

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management endpoints
 */
const Cmt = express.Router();
const commentController = new CommentController();

// GET

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 */
Cmt.get("/comments", commentController.getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment details
 *       404:
 *         description: Comment not found
 */
Cmt.get("/comments/:id", commentController.getCommentById);

/**
 * @swagger
 * /tasks/{taskId}/comments:
 *   get:
 *     summary: Get comments by task ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: List of comments for the task
 */
Cmt.get("/tasks/:taskId/comments", commentController.getCommentsByTaskId);

/**
 * @swagger
 * /users/{userId}/comments:
 *   get:
 *     summary: Get comments by user ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of comments by the user
 */
Cmt.get("/users/:userId/comments", commentController.getCommentsByUserId);

// POST

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - taskId
 *               - userId
 *             properties:
 *               content:
 *                 type: string
 *               taskId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 */
Cmt.post("/comments", commentController.createComment);

// PUT

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 */
Cmt.put("/comments/:id", commentController.updateComment);

// DELETE

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 */
Cmt.delete("/comments/:id", commentController.deleteComment);

/**
 * @swagger
 * /tasks/{taskId}/comments:
 *   delete:
 *     summary: Delete all comments for a task
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Comments deleted
 */
Cmt.delete("/tasks/:taskId/comments", commentController.deleteCommentsByTaskId);

export default Cmt;
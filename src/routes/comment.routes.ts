import express from "express";
import { CommentController } from "../controllers/CommentController";

const Cmt = express.Router();
const commentController = new CommentController();

// GET
Cmt.get("/comments", commentController.getAllComments);
Cmt.get("/comments/:id", commentController.getCommentById);
Cmt.get("/tasks/:taskId/comments", commentController.getCommentsByTaskId);
Cmt.get("/users/:userId/comments", commentController.getCommentsByUserId);

// POST
Cmt.post("/comments", commentController.createComment);

// PUT
Cmt.put("/comments/:id", commentController.updateComment);

// DELETE
Cmt.delete("/comments/:id", commentController.deleteComment);
Cmt.delete("/tasks/:taskId/comments", commentController.deleteCommentsByTaskId);

export default Cmt;
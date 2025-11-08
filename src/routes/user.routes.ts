
import express from "express";
import { UserController } from "../controllers/UserController";

const Users = express.Router();
const userController = new UserController();

// GET
Users.get("/users", userController.getAllUsers);
Users.get("/users/:id", userController.getUserById);

// POST
Users.post("/users", userController.createUser);

// PUT
Users.put("/users/:id", userController.updateUser);

// DELETE
Users.delete("/users/:id", userController.deleteUser);

export default Users;
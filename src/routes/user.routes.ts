
import express from "express";
import { UserController } from "../controllers/UserController";

const Users = express.Router();
const userController = new UserController();

// GET
Users.get("/users", userController.getAllUsers);
Users.get("/users/:id", userController.getUserById);
Users.get("/users/email/:email", userController.findByEmail);

// POST
Users.post("/users", userController.createUser);
Users.post("/users/signup", userController.createUser);
Users.post("/users/login", userController.login);

// PUT
Users.put("/users/:id", userController.updateUser);
Users.put("/users/:id/avatar", userController.updateAvatar);
Users.put("/users/:id/password", userController.changePassword);

// DELETE
Users.delete("/users/:id", userController.deleteUser);

export default Users;
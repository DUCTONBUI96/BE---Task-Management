
import  express from "express";
import { CreateNewUser, DeleteUser, GetAllUsers } from "../controllers/ControllersUsers";

const Users = express.Router();

// GET
Users.get("/users", GetAllUsers);

// POST
Users.post("/users", CreateNewUser);

// DELETE
Users.delete("/users/:id", DeleteUser);

export default Users;
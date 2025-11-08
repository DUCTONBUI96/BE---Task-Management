
import express from "express";
import { RoleController } from "../controllers/RoleController";

const Roles = express.Router();
const roleController = new RoleController();

// GET
Roles.get("/roles", roleController.getAllRoles);
Roles.get("/roles/:id", roleController.getRoleById);

// POST
Roles.post("/roles", roleController.createRole);

// PUT
Roles.put("/roles/:id", roleController.updateRole);

// DELETE
Roles.delete("/roles/:id", roleController.deleteRole);

export default Roles;
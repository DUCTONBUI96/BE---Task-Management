
import  express from "express";
import { CreateNewRole, GetRole,DeleteRoleById, GetAllRoles } from "../controllers/ControllersRoles";

const Roles = express.Router();

//GET
Roles.get("/roles/:id", GetRole);
Roles.get("/roles",GetAllRoles)

//POST
Roles.post("/roles",CreateNewRole)

//DELETE
Roles.delete("/roles/:id",DeleteRoleById)

export default Roles;
import express from "express";
import { ProjectController } from "../controllers/ProjectController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const Project = express.Router();
const projectController = new ProjectController();

// GET
Project.get("/projects", AuthMiddleware.verifyAccessToken, projectController.getAllProjects);
Project.get("/projects/current", AuthMiddleware.verifyAccessToken, projectController.getCurrentProjects);
Project.get("/projects/:id", projectController.getProjectById);
Project.get("/projects/:id/member", projectController.getProjectMembers);

// POST
Project.post("/projects", AuthMiddleware.verifyAccessToken, projectController.createProject);
Project.post("/projects/:id/members", projectController.addMember);

// PUT
Project.put("/projects/:id", projectController.updateProject);

// DELETE
Project.delete("/projects/:id", projectController.deleteProject);
Project.delete("/projects/:projectId/members/:userId", projectController.removeMember);

export default Project;